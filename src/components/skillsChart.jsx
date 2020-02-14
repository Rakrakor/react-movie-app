import React, { Component } from "react";
import CanvasJSReact from "../library/canvasjs.react";
import ProgressBar from "./progressBar";

const SkillsChart = props => {
  //var CanvasJSReact = require("./library/canvasjs.react");
  //var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const options = {
    title: {
      text: "SKills set levels"
    },

    data: [
      {
        type: "column",
        dataPoints: [
          { label: "React", y: 10 },
          { label: "Java8", y: 15 },
          { label: "SpringBoot", y: 25 },
          { label: "MySql", y: 30 },
          { label: "SpringSecurity", y: 28 }
        ]
      }
    ]
  };

  return (
    <div>
      <CanvasJSChart
        options={options}
        /* onRef = {ref => this.chart = ref} */
      />
    </div>
  );
};

export default SkillsChart;
