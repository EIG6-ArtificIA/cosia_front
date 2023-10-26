import { useCallback, useState } from "react";
import { Snackbar } from "@mui/material";
import { makeStyles } from "tss-react/dsfr";
import { fr } from "@codegouvfr/react-dsfr";

const useStyles = makeStyles()(theme => ({
  alert: {
    backgroundColor: theme.decisions.background.default.grey.default,
  },
}));

type Params = {
  message: string;
  autoHideDuration?: number;
};

export const useSnackbar = ({ message, autoHideDuration = 60_000 }: Params) => {
  const { classes, cx } = useStyles();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleClose = useCallback(() => setSnackbarOpen(false), []);

  const SnackbarComponent = () => (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <div className={cx(fr.cx("fr-alert", "fr-alert--success"), classes.alert)}>
        <p>{message}</p>
        <button className="fr-btn--close fr-btn" title="Masquer le message" onClick={handleClose}>
          Masquer le message
        </button>
      </div>
    </Snackbar>
  );

  return { SnackbarComponent, setSnackbarOpen };
};
