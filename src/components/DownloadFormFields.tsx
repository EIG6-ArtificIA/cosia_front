import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { Select } from "@codegouvfr/react-dsfr/Select";
import { FormEvent, memo, useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles } from "tss-react/dsfr";
import { useMutation, useQuery } from "react-query";
import { DepartmentData, createDepartementDataDownload, getAllDepartmentData } from "../api/cosiaApi";
import { CircularProgress } from "@mui/material";
import { useSnackbar } from "../hooks/useSnackbar";
import { isCorrectEmail } from "../utils";
import { useConstCallback } from "powerhooks";

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

type Props = {
  errors: string[] | undefined;
  departmentData: DepartmentData[] | undefined;
  name: string;
  organization: string;
  email: string;
  territory: string;
  setName(newValue: string): void;
  setOrganization(newValue: string): void;
  setEmail(newValue: string): void;
  setTerritory(newValue: string): void;
};

export const DownloadFormFields = ({
  errors,
  departmentData,
  name,
  organization,
  email,
  territory,
  setName,
  setOrganization,
  setEmail,
  setTerritory,
}: Props) => {
  const getFieldState = useConstCallback((field: Field): "default" | "error" | "success" => {
    if (errors === undefined) return "default";
    return errors.includes(field) ? "error" : "default";
  });

  const getFieldStateMessage = useConstCallback((field: Field): string => {
    if (errors === undefined) return "";
    return errors.includes(field) ? MESSAGES[field].error : MESSAGES[field].success;
  });

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
    <>
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
    </>
  );
};
