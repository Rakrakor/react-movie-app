import React, { Component } from "react";
import ProgressBar from "./progressBar";

class SkillsProject extends Component {
  state = {};

  skillsLevels = [
    { skill: "PMI: Certified Associate in Project Mngt.", level: "30" },
    { skill: "PRINCE2: Practitioner Project Mngt.", level: "30" }
  ];

  render() {
    return (
      <div>
        <h3 className="font-weight-bold text-white mb-5">Project Management</h3>
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

export default SkillsProject;
