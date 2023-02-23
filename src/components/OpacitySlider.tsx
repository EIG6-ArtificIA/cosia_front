import { useEffect, useState } from "react";
import { Grid, Slider } from "@mui/material";
import { AvailableLayer } from "geocommuns-core";
import { makeStyles } from "tss-react/dsfr";

const useStyles = makeStyles()({
  sliderValue: {
    width: "3rem",
    display: "inline-block",
    textAlign: "end",
    paddingTop: "3px",
  },
  layerLabel: {},
});

type Props = {
  label: string;
  layer: AvailableLayer;
  setLayerOpacity(layer: AvailableLayer, opacity: number): void;
};

export const OpacitySlider = ({ label, layer, setLayerOpacity }: Props) => {
  const { classes } = useStyles();
  const [opacity, setOpacity] = useState(100);

  useEffect(() => {
    setLayerOpacity(layer, opacity / 100);
  }, [opacity]);

  const onSliderChange = (_event: Event, value: number | number[]) => {
    if (typeof value === "object") {
      console.error(`onSliderChange got number[] as value arg (label : ${label})`);
      return;
    }

    setOpacity(value);
  };

  return (
    <>
      <span className={classes.layerLabel}>{label}</span>
      <Grid container spacing={2}>
        <Grid item xs>
          <Slider
            aria-label="Opacité de la couche ortho"
            defaultValue={100}
            min={0}
            max={100}
            value={opacity}
            onChange={onSliderChange}
          />
        </Grid>
        <Grid item>
          <span className={classes.sliderValue}>{opacity} %</span>
        </Grid>
      </Grid>
    </>
  );
};
