import React, { Component } from "react";
import { Link } from "react-router-dom";
import crud from "../services/offerCRUDService";

class Welcome extends Component {
  state = {
    skills: []
  };

  async componentDidMount() {
    this.setState({ skills: await crud.skills() });
  }

  render() {
    return (
      <div
        className="w3-content developer rounded bg-light opaque"
        style={{ height: "450px", "margin-top": "100px" }}
      >
        <div className="w3-row-padding" style={{ height: "120px" }}></div>
        <div className="w3-row-padding">
          <div
            className="w3-third w3-container align-middle text-black font-weight-bold"
            style={{ "font-size": "50px", "text-align": "center" }}
          >
            Jr Java Developer
          </div>

          <div
            className="w3-third w3-container text-sm-center align-text-bottom"
            style={{ height: "100px", "text-align": "center" }}
          >
            {/*https://create-react-app.dev/docs/using-the-public-folder/ */}
            <a
              href={process.env.PUBLIC_URL + "/CV_Samuel_Rakoton15CA.pdf"}
              target="_blank"
            >
              Download Resume
            </a>
          </div>

          <div
            className="w3-half w3-container text-white"
            style={{ "font-size": "30px", "text-align": "center" }}
          >
            <a
              href="http://www.linkedin.com/in/samuel-rakoton29"
              className="text-black"
              target="_blank"
            >
              Linked
              <i
                className="fa fa-linkedin-square text-info"
                aria-hidden="true"
              ></i>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;
