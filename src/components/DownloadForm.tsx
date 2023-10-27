import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { Select } from "@codegouvfr/react-dsfr/Select";
import { FormEvent, memo, useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles } from "tss-react/dsfr";
import { useMutation, useQuery } from "react-query";
import { createDepartementDataDownload, getAllDepartmentData } from "../api/cosiaApi";
import { CircularProgress } from "@mui/material";
import { useSnackbar } from "../hooks/useSnackbar";
import { isCorrectEmail } from "../utils";
import { useConstCallback } from "powerhooks";

const useStyles = makeStyles()({
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
});

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
  const { classes } = useStyles();
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [territory, setTerritory] = useState("");
  const [errors, setErrors] = useState<string[] | undefined>(undefined);
  const { SnackbarComponent, setSnackbarOpen } = useSnackbar({
    message: "Le téléchargement vient de démarrer",
  });

  const {
    isLoading,
    isError,
    data: departmentData,
    refetch,
  } = useQuery({
    queryKey: ["departmentData"],
    queryFn: () => getAllDepartmentData(),
    staleTime: 60_000,
  });

  const {
    isLoading: isCreating,
    isSuccess,
    isError: isCreationError,
    error: creationError,
    mutate,
  } = useMutation(createDepartementDataDownload);

  const isRequiredStringFieldEmpty = (requiredStringField: string) => {
    return requiredStringField.length < 3;
  };

  const getFormErrors = () => {
    const newErrors = [];
    if (isRequiredStringFieldEmpty(name)) newErrors.push("name");
    if (isRequiredStringFieldEmpty(organization)) newErrors.push("organization");
    if (!isCorrectEmail(email)) newErrors.push("email");
    if (territory === "") newErrors.push("territory");
    return newErrors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = getFormErrors();
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
    if (!isSuccess && !isCreationError) return;

    setSnackbarOpen(true);
    const downloadLink = departmentData?.find(depData => depData.id == territory)?.download_link;
    if (downloadLink) window.open(downloadLink, "_self");

    if (isCreationError) {
      console.error("Error during DepartmentDataDownloadCreation", {
        creationError,
        email,
        organization,
        username: name,
        department_data: territory,
      });
    }
  }, [isSuccess, isCreationError]);

  const getFieldState = useConstCallback((field: Field): "default" | "error" | "success" => {
    if (errors === undefined) return "default";
    return errors.includes(field) ? "error" : "default";
  });

  const getFieldStateMessage = useConstCallback((field: Field): string => {
    if (errors === undefined) return "";
    return errors.includes(field) ? MESSAGES[field].error : MESSAGES[field].success;
  });

  const loaderOrErrorContainer = useMemo(
    () => (
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
    ),
    [isLoading, isError],
  );

  const getInput = useCallback(
    (label: string, fieldName: Field, field: string, setField: (a: string) => void) => (
      <Input
        label={label}
        state={getFieldState(fieldName)}
        stateRelatedMessage={getFieldStateMessage(fieldName)}
        nativeInputProps={{
          name: fieldName,
          value: field,
          onChange: e => {
            setField(e.currentTarget.value);
          },
        }}
      />
    ),
    [],
  );

  return (
    <div className={classes.container}>
      <SnackbarComponent />

      <h6 className={classes.h6}>Télécharger un département</h6>
      {isLoading || isError ? (
        loaderOrErrorContainer
      ) : (
        <form onSubmit={handleSubmit}>
          {getInput("Nom, Prénom", "name", name, setName)}
          {getInput("Organisation*", "organization", organization, setOrganization)}
          {getInput("Email*", "email", email, setEmail)}
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
            type="submit"
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
