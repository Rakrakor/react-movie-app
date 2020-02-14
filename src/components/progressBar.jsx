import React, { Component } from "react";

const ProgressBar = ({ name, level }) => {
  const classLevel = ["progress-bar bg-info w-" + level];

  return (
    <div class="progress">
      <div
        className={classLevel}
        role="progressbar"
        aria-valuenow={level}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {name}
      </div>
    </div>
  );
};

export default ProgressBar;
