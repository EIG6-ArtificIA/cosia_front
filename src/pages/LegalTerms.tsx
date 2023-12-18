import { fr } from "@codegouvfr/react-dsfr";
import { makeStyles } from "tss-react/dsfr";

const useStyles = makeStyles()(theme => ({
  body: {
    margin: "auto",
    maxWidth: 1000,
    width: "90%",
    backgroundColor: theme.decisions.background.default.grey.default,
    marginTop: fr.spacing("5w"),
    marginBottom: fr.spacing("5w"),
  },
}));

export const LegalTerms = () => {
  const { classes } = useStyles();
  return (
    <section className={classes.body}>
      <h1>Mentions Légales</h1>

      <h6>Éditeur du site</h6>
      <p>
        Institut national de l’information géographique et forestière (IGN)
        <br />
        Établissement public administratif sous la double tutelle des ministères respectivement chargés
        de l’écologie et de la forêt
        <br />
        Adresse : 73 avenue de Paris – 94165 SAINT-MANDÉ Cedex
        <br />
        Téléphone : 01 43 98 80 00
      </p>

      <h6>Directeur de publication</h6>
      <p>Sébastien Soriano</p>

      <h6>Conception et gestion du site</h6>
      <p>
        Ce prototype est conçu et développé dans le cadre du programme Entrepreneurs d’Intérêt Général.
        Il est maintenu au sein de l’IGN - Institut National de l’Information Géographique et Forestière.
        Les informations et documents disponibles sur ce site sont susceptibles d’être modifiés à tout
        moment, et peuvent faire l’objet de mises à jour.
      </p>

      <h6>Hébergement</h6>
      <p>
        L’hébergement et l’infogérance sont assurés par la société OVH
        <br />
        Siège social : 2 rue Kellermann - 59100 Roubaix - France. <br />
        OVH SAS est une filiale de la société OVH Groupe SA, société immatriculée au RCS de Lille sous le
        numéro 537 407 926 sise 2, rue Kellermann, 59100 Roubaix.
      </p>

      <h6>Réutilisation des contenus et liens</h6>
      <b>Droit de propriété intellectuelle et réutilisation des contenus : </b>
      <p>
        Les marques, les illustrations, le contenu éditorial, les divers éléments de la charte graphique,
        les données cartographiques ainsi que tout autre élément susceptibles d’être protégés par le
        droit de propriété intellectuelle figurant sur le site CosIA (cosia.fr) sont des éléments dont
        l’IGN détient la propriété ou les droits d’exploitation. Sauf mention contraire, tous les
        contenus de ce site sont proposés sous licence ouverte Etalab 2.0.
      </p>
      <b>Liens hypertextes pointant vers le site CosIA (cosia.fr) : </b>
      <p>
        L’établissement d’un hyperlien vers le site CosIA (cosia.fr) est libre et gratuit à la condition
        que cet hyperlien permette l’ouverture d’une nouvelle fenêtre de visualisation, que l’affichage
        de l’URL CosIA (cosia.fr) dans la nouvelle fenêtre soit lisible par l’internaute dès son
        ouverture et tout au long de la navigation sur le site, sauf autorisation préalable de l’IGN, et
        qu’il indique qu’il s’agit d’un site en phase de test. L’IGN se réserve le droit de faire
        supprimer un hyperlien vers le site CosIA (cosia.fr) qui serait de nature à nuire à sa politique
        éditoriale ou à porter atteinte à son image.
      </p>

      <h6>Clause de responsabilité</h6>
      <p>
        Nonobstant les termes de la licence Etalab 2.0, l’IGN s’engage à fournir les moyens nécessaires
        et raisonnables pour assurer ou faire assurer un accès continu au site CosIA (cosia.fr) et à ses
        contenus. L’IGN ne pourra toutefois être tenu pour responsable à l’égard des utilisateurs en cas
        d’interruption, de défaillance, de défaut éventuel de qualité des services du site CosIA
        (cosia.fr) pour quelque raison que ce soit, y compris pour des raisons de maintenance,
        d’entretien ou de mise à jour des serveurs, étant entendu que le site CosIA (cosia.fr) est un
        site en phase de test et qu’il est fourni gratuitement.
      </p>
      <p>
        Les utilisateurs sont expressément informés que la mise à disposition de tout ou partie du
        contenu et des fonctionnalités du site CosIA (cosia.fr) relève d’un choix discrétionnaire de
        l’IGN. En conséquence, l’IGN est libre de faire évoluer ou supprimer tout ou partie du site CosIA
        (cosia.fr), à tout moment, sans que cela n’ouvre droit à une quelconque indemnisation au bénéfice
        des utilisateurs. A titre d’exemple, l’IGN peut ainsi décider d’améliorer, ajouter ou supprimer
        certaines fonctionnalités, afin notamment de s’adapter aux demandes des utilisateurs, aux
        évolutions technologiques, à ses contraintes économiques, ou bien encore pour tenir compte
        d’impératifs de sécurité ou règlementaires. L’IGN s’efforcera d’informer les utilisateurs, avec
        un préavis raisonnable, de la fermeture à venir du site CosIA (cosia.fr) ou de la suppression de
        fonctionnalités majeures du site CosIA (cosia.fr).
      </p>
      <p>
        Sauf mention contraire, les contenus du site CosIA (cosia.fr) sont publiés à titre d’information,
        à l’exclusion de toute garantie sur leur exactitude ou leur adéquation aux besoins spécifiques
        des utilisateurs, et ne peuvent être utilisés pour fonder une décision privative de droit. Les
        contenus du site CosIA (cosia.fr) n’engagent en aucun cas la responsabilité de l’IGN en cas de
        dommage direct ou indirect découlant de leur non-conformité à la réalité du terrain.
      </p>
      <p>
        Si vous constatiez une erreur ou une omission dans les contenus du site CosIA (cosia.fr), nous
        vous remercions de nous contacter à :{" "}
        <a href="mailto:contact.geoservices@ign.fr?subject=[CoSIA] Retours site">
          contact.geoservices@ign.fr
        </a>
        .
      </p>

      <h6>Cas d’usages</h6>
      <p>
        Sur demande de l’utilisateur, l’IGN propose un accompagnement dans la mise en place ou
        l’enrichissement d’un cas d’usage. Ces services proposés relèvent d’un choix discrétionnaire de
        l’IGN. Par conséquent, l’IGN se réserve le droit de refuser de faire droit à ces services, et ce,
        sans devoir se justifier auprès de l’utilisateur.
      </p>

      <h6>Crédits photographiques</h6>
      <p>
        Sauf mention contraire, les images et photographies utilisées proviennent par défaut des
        ressources de l’IGN.
      </p>

      <h6>Accessibilité</h6>
      <p>Accessibilité : Non conforme</p>
      <p>
        Ce prototype est développé selon les recommandations du Référentiel général d'amélioration de
        l'accessibilité (RGAA) mais n’a pas encore fait l’objet d’un audit permettant de garantir
        l’accessibilité des contenus.
      </p>

      <h6>Nous contacter</h6>
      <p>
        Pour toutes questions, suggestions, précisions complémentaires, vous pouvez nous contacter à :{" "}
        <a href="mailto:contact.geoservices@ign.fr?subject=[CoSIA]">contact.geoservices@ign.fr</a>
      </p>
    </section>
  );
};
