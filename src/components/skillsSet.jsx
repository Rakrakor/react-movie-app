import React, { Component } from "react";
import ProgressBar from "./progressBar";

class SkillsSet extends Component {
  state = {};

  skillsLevels = [
    { skill: "React", level: "10" },
    { skill: "Java8", level: "15" },
    { skill: "SpringBoot", level: "25" },
    { skill: "MySQL", level: "30" },
    { skill: "SpringSecurity", level: "28" }
  ];

  render() {
    return (
      <div>
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

export default SkillsSet;
