import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { Select } from "@codegouvfr/react-dsfr/Select";
import { FormEvent, memo, useCallback, useEffect, useState } from "react";
import { makeStyles } from "tss-react/dsfr";
import { useMutation, useQuery } from "react-query";
import { createDepartementDataDownload, getAllDepartmentData } from "../api/cosiaApi";
import { CircularProgress, Snackbar } from "@mui/material";

const useStyles = makeStyles()(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: 300,
  },
  h6: {
    fontSize: "1rem",
    marginBottom: fr.spacing("4w"),
  },
  button: {
    alignSelf: "end",
  },
  loaderOrErrorContainer: {
    width: "100%",
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  errorContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  alert: {
    backgroundColor: theme.decisions.background.default.grey.default,
  },
}));

type Field = "name" | "organization" | "email" | "territory";
const MESSAGES: Record<Field, { success: string; error: string }> = {
  name: {
    success: "Le nom  est bien renseigné",
    error: "Le nom est obligatoire",
  },
  organization: {
    success: "L'organisation est bien renseigné",
    error: "Le champ est obligatoire",
  },
  email: {
    success: "L'email  est bien renseigné",
    error: "L'email n'a pas été renseigné ou n'est pas de la bonne forme",
  },
  territory: {
    success: "Territoire bien sélectionné",
    error: "Veuillez sélectionner un territoire",
  },
};

const DownloadForm = () => {
  const { classes, cx } = useStyles();
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [territory, setTerritory] = useState("");
  const [errors, setErrors] = useState<string[] | undefined>(undefined);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleClose = useCallback(() => setSnackbarOpen(false), []);

  const {
    isLoading,
    isError,
    data: departmentData,
    refetch,
  } = useQuery({
    queryKey: ["departmentData"],
    queryFn: () => getAllDepartmentData(),
    staleTime: 600_000,
  });

  const isRequiredStringFieldEmpty = (requiredStringField: string) => {
    return requiredStringField.length < 3;
  };
  const isCorrectEmail = () => /^[\w\-.]+@[\w-]+\.[\w-]{2,}$/.test(email);

  const getFormErrors = () => {
    const newErrors = [];
    if (isRequiredStringFieldEmpty(name)) newErrors.push("name");
    if (isRequiredStringFieldEmpty(organization)) newErrors.push("organization");
    if (!isCorrectEmail()) newErrors.push("email");
    if (territory === "") newErrors.push("territory");
    return newErrors;
  };

  const {
    isLoading: isCreating,
    isSuccess,
    isError: isCreationError,
    error: creationError,
    mutate,
  } = useMutation(createDepartementDataDownload);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = getFormErrors();
    console.log(newErrors);
    setErrors(newErrors);
    if (newErrors.length === 0) {
      const payload = {
        email,
        organization,
        username: name,
        department_data: territory,
      };
      mutate(payload);
    }
  };

  useEffect(() => {
    if (isSuccess || isCreationError) {
      setSnackbarOpen(true);
      const downloadLink = departmentData?.find(depData => depData.id == territory)?.download_link;
      if (downloadLink)
        window.open(
          "https://geoservices.ign.fr/download/files/221470/3eb5f9fa7c4cec347a66d7cbafaa14fb/0/1100/0/1",
          "_self",
        );
    }
    if (isCreationError) {
      console.error("Error during DepartmentDataDownloadCreation", {
        email,
        organization,
        username: name,
        department_data: territory,
      });
    }
  }, [isSuccess, isCreationError]);

  const getFieldState = (field: Field): "default" | "error" | "success" => {
    if (errors === undefined) return "default";
    return errors.includes(field) ? "error" : "default";
  };

  const getFieldStateMessage = (field: Field): string => {
    if (errors === undefined) return "";
    return errors.includes(field) ? MESSAGES[field].error : MESSAGES[field].success;
  };

  const loaderOrErrorContainer = (
    <div className={classes.loaderOrErrorContainer}>
      {isLoading ? (
        <CircularProgress />
      ) : isError ? (
        <div className={classes.errorContainer}>
          <p>Un problème est survenu.</p>
          <Button onClick={() => refetch()}>Réessayer</Button>
        </div>
      ) : null}
    </div>
  );

  return (
    <div className={classes.container}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={60000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <div className={cx(fr.cx("fr-alert", "fr-alert--success"), classes.alert)}>
          <p>Le téléchargement est lancé !</p>
          <button className="fr-btn--close fr-btn" title="Masquer le message" onClick={handleClose}>
            Masquer le message
          </button>
        </div>
      </Snackbar>

      <h6 className={classes.h6}>Télécharger un département</h6>
      {isLoading || isError ? (
        loaderOrErrorContainer
      ) : (
        <form onSubmit={handleSubmit}>
          <Input
            label="Nom, Prénom*"
            state={getFieldState("name")}
            stateRelatedMessage={getFieldStateMessage("name")}
            nativeInputProps={{
              name: "name",
              value: name,
              onChange: e => {
                setName(e.currentTarget.value);
              },
            }}
          />
          <Input
            label="Organisation*"
            state={getFieldState("organization")}
            stateRelatedMessage={getFieldStateMessage("organization")}
            nativeInputProps={{
              name: "organization",
              value: organization,
              onChange: e => {
                setOrganization(e.currentTarget.value);
              },
            }}
          />
          <Input
            label="Email*"
            state={getFieldState("email")}
            stateRelatedMessage={getFieldStateMessage("email")}
            nativeInputProps={{
              name: "email",
              value: email,
              onChange: e => {
                setEmail(e.currentTarget.value);
              },
            }}
          />
          <Select
            label="Territoire"
            state={getFieldState("territory")}
            stateRelatedMessage={getFieldStateMessage("territory")}
            nativeSelectProps={{
              onChange: event => setTerritory(event.target.value),
              value: territory,
            }}
          >
            <option value="" disabled hidden>
              Selectionnez une option
            </option>
            {departmentData &&
              departmentData.map(depData => (
                <option value={depData.id} key={depData.id}>
                  {depData.label}
                </option>
              ))}
          </Select>
          <Button
            iconId="fr-icon-download-line"
            className={classes.button}
            type={"submit"}
            disabled={isCreating}
          >
            Télécharger {isCreating ? <CircularProgress /> : null}
          </Button>
        </form>
      )}
    </div>
  );
};

export const MemoDownloadForm = memo(DownloadForm);
