import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { Select } from "@codegouvfr/react-dsfr/Select";
import { FormEvent, memo, useState } from "react";
import { makeStyles } from "tss-react/dsfr";
import { DOWNLOADABLE_TERRITORIES } from "../data/downloadableTerritories";

const useStyles = makeStyles()({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  h6: {
    fontSize: "1rem",
    marginBottom: fr.spacing("4w"),
  },
  button: {
    alignSelf: "end",
  },
});

type Field = "name" | "organisation" | "email" | "territory";
const MESSAGES: Record<Field, { success: string; error: string }> = {
  name: {
    success: "Le nom  est bien renseigné",
    error: "Le nom est obligatoire",
  },
  organisation: {
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

const AVAILABLE_TERRITORIES = DOWNLOADABLE_TERRITORIES.map(t => t.label);

const DownloadForm = () => {
  const { classes } = useStyles();
  const [name, setName] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [email, setEmail] = useState("");
  const [territory, setTerritory] = useState("");
  const [errors, setErrors] = useState<string[] | undefined>(undefined);

  const isRequiredStringFieldEmpty = (requiredStringField: string) => {
    return requiredStringField.length < 3;
  };
  const isCorrectEmail = () => /^[\w\-.]+@[\w-]+\.[\w-]{2,}$/.test(email);

  const getFormErrors = () => {
    const newErrors = [];
    if (isRequiredStringFieldEmpty(name)) newErrors.push("name");
    if (isRequiredStringFieldEmpty(organisation)) newErrors.push("organisation");
    if (!isCorrectEmail()) newErrors.push("email");
    if (territory === "") newErrors.push("territory");
    return newErrors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = getFormErrors();
    console.log(newErrors);
    setErrors(newErrors);
  };

  const getFieldState = (field: Field): "default" | "error" | "success" => {
    if (errors === undefined) return "default";
    return errors.includes(field) ? "error" : "default";
  };

  const getFieldStateMessage = (field: Field): string => {
    if (errors === undefined) return "";
    return errors.includes(field) ? MESSAGES[field].error : MESSAGES[field].success;
  };

  return (
    <div className={classes.container}>
      <h6 className={classes.h6}>Télécharger un département</h6>
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
          state={getFieldState("organisation")}
          stateRelatedMessage={getFieldStateMessage("organisation")}
          nativeInputProps={{
            name: "organisation",
            value: organisation,
            onChange: e => {
              setOrganisation(e.currentTarget.value);
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
          {AVAILABLE_TERRITORIES.map(territory => (
            <option value={territory} key={territory}>
              {territory}
            </option>
          ))}
        </Select>
        <Button iconId="fr-icon-download-line" className={classes.button} type={"submit"}>
          Télécharger
        </Button>
      </form>
    </div>
  );
};

export const MemoDownloadForm = memo(DownloadForm);
