import { fr } from "@codegouvfr/react-dsfr";
import { memo } from "react";
import { makeStyles } from "tss-react/dsfr";

const useStyles = makeStyles()(theme => ({
  infoDoc: {
    fontSize: 12,
    color: theme.decisions.text.mention.grey.default,
    margin: 0,
  },
  icon: {
    color: theme.decisions.text.label.blueFrance.default,
  },
  container: {
    marginBottom: fr.spacing("1w"),
    display: "grid",
    gridTemplateColumns: "30px 1fr",
  },
}));

export type Doc = { name: string; link?: string; size?: string };

type Props = {
  doc: Doc;
  icon?: string;
};

const DownloadLink = ({ doc, icon }: Props) => {
  const { classes, cx } = useStyles();

  const docInfo = doc.size ? `PDF - ${doc.size}` : undefined;

  const iconClassName = icon || fr.cx("fr-icon-file-fill");

  return (
    <div key={doc.name} className={classes.container}>
      <span className={cx(iconClassName, classes.icon)} />
      <div>
        <a
          className="fr-link fr-icon-download-line fr-link--icon-right"
          href={doc.link || "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          {doc.name}
        </a>
        {docInfo && <p className={classes.infoDoc}>{docInfo}</p>}
      </div>
    </div>
  );
};

export const MemoizedDownladLink = memo(DownloadLink);
