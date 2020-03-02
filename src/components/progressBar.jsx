import React from "react";

const ProgressBar = ({ name, level }) => {
  let classLevel = null;
  if (level < 30) {
    classLevel = ["text-left progress-bar bg-warning w-" + level];
  } else if (level > 25 && level < 50) {
    classLevel = ["text-left progress-bar bg-info w-" + level];
  } else {
    classLevel = ["text-left progress-bar bg-success w-" + level];
  }
  //remove if you want different colors for different levels
  classLevel = "text-left progress-bar bg-info w-";

  // const classLevel = ["progress-bar bg-success w-" + level];
  const objStyle = { width: level + "%" };

  return (
    <div
      class="mt-1 progress"
      style={{
        height: "20px",
        "font-size": "18px",
        "font-weight": "bold"
      }}
    >
      <div
        className={classLevel}
        role="progressbar"
        style={objStyle}
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
