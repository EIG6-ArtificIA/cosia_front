import Map from "ol/Map.js";
import View from "ol/View.js";
import GeoJSON from "ol/format/GeoJSON.js";
import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import { Fill, Style } from "ol/style.js";
import { fromLonLat } from "ol/proj";

import { useEffect } from "react";

const style = new Style({
  fill: new Fill({
    color: "#eeeeee",
  }),
});

const vector = new VectorLayer({
  source: new VectorSource({
    url: "/data/departments_500m.geojson",
    format: new GeoJSON(),
  }),
  background: "white",
  style: function (feature) {
    const color = feature.get("COLOR") || "#eeeeee";
    style.getFill().setColor(color);
    return style;
  },
});

export const useMapTest = (target: string) => {
  useEffect(() => {
    const map = new Map({
      layers: [vector],
      target,
      view: new View({
        center: fromLonLat([5.9, 51.1]),
        zoom: 6,
      }),
    });

    return () => map.setTarget(undefined);
  }, []);

  // const selected = new Style({
  // fill: new Fill({
  // color: '#eeeeee',
  // }),
  // stroke: new Stroke({
  // color: 'rgba(255, 255, 255, 0.7)',
  // width: 2,
  // }),
  // });
  //
  // const selectStyle = (feature)=> {
  // const color = feature.get('COLOR') || '#eeeeee';
  // selected.getFill().setColor(color);
  // return selected;
  // }
  //
  // select interaction working on "singleclick"
  // const selectSingleClick = new Select({style: selectStyle});
  //
  // select interaction working on "click"
  // const selectClick = new Select({
  // condition: click,
  // style: selectStyle,
  // });
  //
  // select interaction working on "pointermove"
  // const selectPointerMove = new Select({
  // condition: pointerMove,
  // style: selectStyle,
  // });
  //
  // const selectAltClick = new Select({
  // style: selectStyle,
  // condition: function (mapBrowserEvent) {
  // return click(mapBrowserEvent) && altKeyOnly(mapBrowserEvent);
  // },
  // });
  //
  // const selectElement = document.getElementById('type');
  //
  // const changeInteraction = function () {
  // if (select !== null) {
  // map.removeInteraction(select);
  // }
  // const value = selectElement?.value || '';
  // if (value == 'singleclick') {
  // setSelect(selectSingleClick);
  // } else if (value == 'click') {
  // setSelect(selectClick);
  // } else if (value == 'pointermove') {
  // setSelect(selectPointerMove);
  // } else if (value == 'altclick') {
  // setSelect(selectAltClick);
  // } else {
  // setSelect(null);
  // }
  // if (select !== null) {
  // map.addInteraction(select);
  // select.on('select', function (e) {
  // document.getElementById('status').innerHTML =
  // '&nbsp;' +
  // e.target.getFeatures().getLength() +
  // ' selected features (last operation selected ' +
  // e.selected.length +
  // ' and deselected ' +
  // e.deselected.length +
  // ' features)';
  // });
  // }
  // };
  //
  // /**
  //  * onchange callback on the select element.
  // */
  // selectElement.onchange = changeInteraction;
  // changeInteraction();
};
