import Button from "@codegouvfr/react-dsfr/Button";
import { CircularProgress } from "@mui/material";
import { useMemo } from "react";
import { makeStyles } from "tss-react/dsfr";

type Props = {
  isLoading: boolean;
  isError: boolean;
  refetch(): void;
};

const useStyles = makeStyles()({
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

export const LoaderOrErrorContainer = ({ isLoading, isError, refetch }: Props) => {
  const { classes } = useStyles();
  console.log(isError);

  const content = useMemo(() => {
    if (isLoading) return <CircularProgress />;
    if (isError)
      return (
        <div className={classes.errorContainer}>
          <p>Un problème est survenu.</p>
          <Button onClick={refetch}>Réessayer</Button>
        </div>
      );
    return null;
  }, [isLoading, isError, refetch]);

  return <div className={classes.loaderOrErrorContainer}>{content}</div>;
};
