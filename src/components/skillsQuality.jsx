import React, { Component } from "react";
import ProgressBar from "./progressBar";

class SkillsQuality extends Component {
  state = {};

  skillsLevels = [
    { skill: "ISO9001", level: "60" },
    { skill: "ARP4754", level: "30" },
    { skill: "IEC62304", level: "50" },
    { skill: "DO-178C", level: "75" },
    { skill: "DO-256", level: "40" },
    { skill: "8D trouble shooting Methodology", level: "80" },
    { skill: "FMEA", level: "60" },
    { skill: "Risk Management", level: "60" }
  ];

  render() {
    return (
      <div>
        <h3 className="font-weight-bold text-white mb-5">
          Quality (Company/System/Software process levels-
        </h3>
        {this.skillsLevels.map(skill => (
          <ProgressBar
            key={skill.skill}
            name={skill.skill}
            level={skill.level}
          />
        ))}
      </div>
    );
  }
}

export default SkillsQuality;
