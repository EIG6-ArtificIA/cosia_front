import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import { FormEvent, memo, useEffect, useMemo, useState } from "react";
import { makeStyles } from "tss-react/dsfr";
import { useMutation, useQuery } from "react-query";
import { CircularProgress } from "@mui/material";

import { DepartmentData, createDepartementDataDownload, getAllDepartmentData } from "../api/cosiaApi";
import { useSnackbar } from "../hooks/useSnackbar";
import { isCorrectEmail } from "../utils/utils";
import { DownloadFormFields } from "./DownloadFormFields";
import { LoaderOrErrorContainer } from "./ui/LoaderOrErrorContainer";

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
});

type MessageAndType = { message: string; type: "success" | "error" };

const SUCCESS_MESSAGE: MessageAndType = {
  message: "Le téléchargement vient de démarrer",
  type: "success",
};

const ERROR_MESSAGE: MessageAndType = {
  message: "Le téléchargement a échoué. Veuillez réessayer plus tard ou contactez-nous : cosia@ign.fr",
  type: "error",
};

const DownloadForm = () => {
  const { classes } = useStyles();
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [territory, setTerritory] = useState("");
  const [selectedDepartmentData, setSelectedDepartmentData] = useState<DepartmentData | undefined>(
    undefined,
  );
  const [errors, setErrors] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    if (territory == undefined) setSelectedDepartmentData(undefined);
    const newDepartmentData = departmentData?.find(depData => depData.id == territory);
    setSelectedDepartmentData(newDepartmentData);
  }, [territory]);

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
    isSuccess: isCreationSuccess,
    isError: isCreationError,
    error: creationError,
    mutate,
    data: departmentDataDownload,
  } = useMutation(createDepartementDataDownload);

  const snackbarMessageAndType = useMemo(() => {
    return isCreationSuccess ? SUCCESS_MESSAGE : ERROR_MESSAGE;
  }, [isCreationSuccess, isCreationError]);

  const { SnackbarComponent, setSnackbarOpen } = useSnackbar({
    ...snackbarMessageAndType,
  });

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

  const getPayload = () => {
    return {
      email,
      organization,
      username: name,
      departmentData: territory,
    };
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = getFormErrors();
    setErrors(newErrors);
    if (newErrors.length === 0) {
      const payload = getPayload();
      mutate(payload);
    }
  };

  useEffect(() => {
    if (departmentDataDownload !== undefined) {
      setSnackbarOpen(true);
      const downloadLink = departmentDataDownload.departmentData.s3DownloadUrl;
      if (downloadLink) window.open(downloadLink, "_self");
    }
  }, [departmentDataDownload]);

  useEffect(() => {
    if (!isCreationError) return;

    console.error("Error during DepartmentDataDownloadCreation", { creationError, ...getPayload() });
    setSnackbarOpen(true);
  }, [isCreationError]);

  return (
    <div className={classes.container}>
      <SnackbarComponent />

      <h6 className={classes.h6}>Télécharger un département</h6>
      {isLoading || isError ? (
        <LoaderOrErrorContainer isLoading={isLoading} isError={isError} refetch={refetch} />
      ) : (
        <form onSubmit={handleSubmit}>
          <DownloadFormFields
            errors={errors}
            departmentData={departmentData}
            name={name}
            organization={organization}
            email={email}
            territory={territory}
            setName={setName}
            setOrganization={setOrganization}
            setEmail={setEmail}
            setTerritory={setTerritory}
          />
          {selectedDepartmentData && (
            <p>
              <i>
                Taille du fichier Zip : {selectedDepartmentData.zipSize}
                <br />
                Taille du fichier décompressé : {selectedDepartmentData.fileSize}
                <br />
              </i>
            </p>
          )}
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
