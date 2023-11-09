import { useEffect } from "react";
import { makeStyles } from "tss-react/dsfr";
import { useDepartments } from "../hooks/useDepartments";
import { useMap } from "../hooks/useMap";
import { useToolTipMap } from "../hooks/useTooltipMap";
import { LoaderOrErrorContainer } from "./ui/LoaderOrErrorContainer";

const useStyles = makeStyles()(theme => ({
  container: {
    display: "grid",
    gridTemplateRow: "1fr",
    gridTemplateColumn: "1fr",
    maxWidth: 800,
    minHeight: 350,
    maxHeight: 800,
  },
  mapContainer: {
    height: "100%",
    width: "100%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.decisions.artwork.motif.grey.default,
    gridColumn: 1,
    gridRow: 1,
  },
  loadingContainer: {
    gridColumn: 1,
    gridRow: 1,
    zIndex: 2,
    display: "flex",
    alignSelf: "center",
    justifyContent: "center",
  },
}));

type Props = {
  className?: string;
};

export const FrenchMap = ({ className }: Props) => {
  const { classes, cx } = useStyles();
  const { isLoading, isError, refetch, departmentLayer, departmentsExtent } = useDepartments();
  const { map } = useMap("map");
  useToolTipMap({ map, layer: departmentLayer });

  useEffect(() => {
    if (map === undefined) return;
    if (departmentLayer === undefined) return;

    map.addLayer(departmentLayer);

    return () => {
      map.removeLayer(departmentLayer);
    };
  }, [departmentLayer]);

  useEffect(() => {
    if (map === undefined || departmentsExtent === undefined) return;
    map.getView().fit(departmentsExtent, { padding: [10, 10, 10, 10] });
  }, [map, departmentsExtent]);

  return (
    <div className={cx(classes.container, className)}>
      {(isLoading || isError) && (
        <div className={cx(classes.mapContainer, classes.loadingContainer)}>
          <LoaderOrErrorContainer isLoading={isLoading} isError={isError} refetch={refetch} />
        </div>
      )}
      <div id="map" className={classes.mapContainer}></div>
    </div>
  );
};
