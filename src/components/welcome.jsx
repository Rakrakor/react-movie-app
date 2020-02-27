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
        className="developer container rounded bg-light opaque"
        style={{ height: "400px", "margin-top": "100px" }}
      >
        <div className="align-top" style={{ height: "150px" }}></div>

        <div
          className="align-middle text-sm-center text-black font-weight-bold"
          style={{ "font-size": "50px" }}
        >
          Jr Java Developer
        </div>

        <div
          className="text-sm-center align-text-bottom"
          style={{ height: "100px" }}
        >
          {/*https://create-react-app.dev/docs/using-the-public-folder/ */}
          <a href={process.env.PUBLIC_URL + "/CV_Samuel_Rakoton14CA.pdf"}>
            Download Resume
          </a>
        </div>

        <div
          className="fixed-bottom"
          className="text-sm-center text-white"
          style={{ "font-size": "30px" }}
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
    );
  }
}

export default Welcome;
