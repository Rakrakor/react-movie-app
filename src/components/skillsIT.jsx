import React, { Component } from "react";
import ProgressBar from "./progressBar";

class SkillsIT extends Component {
  skillsLevels = [
    { skill: "React", level: "24" },
    { skill: "Java8", level: "30" },
    { skill: "Java7", level: "75" },
    { skill: "SpringMVC", level: "75" },
    { skill: "SpringBoot", level: "40" },
    { skill: "SpringSecurity", level: "25" },
    { skill: "JPA Hibernate", level: "60" },
    { skill: "MySQL", level: "70" }
  ];

  render() {
    return (
      <div>
        <h3 className="font-weight-bold text-white mb-5">I.T</h3>

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

export default SkillsIT;
