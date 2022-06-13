import React, { Component } from "react";
import ProgressBar from "./progressBar";

class SkillsIT extends Component {
  skillsLevels = [
    { skill: "AWS", level: "20" },
    { skill: "Heroku", level: "25" },
    { skill: "Git", level: "35" },
    { skill: "React", level: "24" },
    { skill: "Python", level: "75" },
    { skill: "Java8", level: "60" },
    { skill: "Java7", level: "70" },
    { skill: "SpringMVC", level: "75" },
    { skill: "SpringBoot", level: "40" },
    { skill: "SpringSecurity", level: "25" },
    { skill: "JPA Hibernate", level: "60" },
    { skill: "MySQL", level: "65" }
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
