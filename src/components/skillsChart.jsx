import React from "react";
import CanvasJSReact from "../library/canvasjs.react";

const SkillsChart = props => {
  //var CanvasJSReact = require("./library/canvasjs.react");
  //var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const options = {
    title: {
      text: "Areas of experience (%)"
    },

    data: [
      {
        type: "column",
        dataPoints: [
          { label: "Quality Management", y: 80 },
          { label: "Projet Management", y: 50 },
          { label: "IT", y: 45 }
        ]
      }
    ]
  };

  return (
    <div
      className="rounded opaque"
      style={{ height: "500px", "margin-top": "100px" }}
    >
      <CanvasJSChart
        options={options}

        /* onRef = {ref => this.chart = ref} */
      />
    </div>
  );
};

export default SkillsChart;
