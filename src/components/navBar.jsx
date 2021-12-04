import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

/*NavLink allows to highlight the active class */

const NavBar = ({ user }) => {
  return (
    //*******************************

    /*
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <Link className="navbar-brand font-weight-bold pr-5 mr-5" to="/">
          Developer.
        </Link>

        <div
          className="navbar-nav justify-content-start"
          style={{ float: "left" }}
        >
          <NavLink className="nav-item nav-link " to="/welcome">
            Welcome
          </NavLink>

          <NavLink
            className="nav-item nav-link justify-content-flex-end"
            to="/skillsChart"
          >
            Areas of Experience
          </NavLink>

          <NavLink
            className="nav-item nav-link justify-content-flex-end"
            to="/skillsSet"
          >
            IT SkillsSet
          </NavLink>

          <NavLink
            className="nav-item nav-link justify-content-flex-end"
            to="/movies"
          >
            Post a Job Offer
          </NavLink>
        </div>

        <div style={{ float: "right" }}>
          <NavLink
            className="nav-item nav-link justify-content-end my-2 my-sm-0"
            to="/login"
          >
            Login
          </NavLink>
        </div>
      </nav>
    */

    //*******************************

    <nav className="navbar navbar-expand-lg navbar-light bg-light navBarBckg ">
      <a
        className="navbar-brand font-weight-bold pr-5 mr-5 text-white"
        href="mailto:samuel.rakoton@gmail.com?subject=Developer needed!"
      >
        <i class="fa fa-envelope" aria-hidden="true"></i>

        <span>
          {" "}
          Contact Samuel{" "}
          <sub>
            <h6>Sw Developer</h6>
          </sub>
        </span>
      </a>

      <button
        className="navbar-toggler"
        style={{
          "background-color": "white",
          opacity: "0.44",
          border: "none",
        }}
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-hidden="true"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <NavLink className="nav-link text-white" to="/welcome">
              Welcome<span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/skillsChart">
              Areas of Experience
            </NavLink>
          </li>
          <li className="nav-item dropdown">
            <NavLink
              className="nav-link dropdown-toggle text-white "
              to="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="false"
              aria-expanded="true"
            >
              Detailed skills
            </NavLink>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <NavLink className="dropdown-item" to="/skillsIT">
                I.T
              </NavLink>
              <div className="dropdown-divider"></div>
              <NavLink className="dropdown-item" to="/skillsProject">
                Project Management
              </NavLink>
              <div className="dropdown-divider"></div>
              <NavLink className="dropdown-item" to="/skillsQuality">
                Quality/ Certification
              </NavLink>
            </div>
          </li>
          <li className="nav-item">
            {user && (
              <NavLink
                className="nav-link text-warning font-weight-bold "
                to="/jobOffer/new"
                style={{ "font-size": "20px" }}
              >
                Submit a new Job Offer
              </NavLink>
            )}
            {user && (
              <NavLink
                className="nav-link text-warning font-weight-bold "
                to="/jobOffers"
                style={{ "font-size": "15px" }}
              >
                Offer DashBoard
              </NavLink>
            )}
            {!user && (
              <NavLink
                className="nav-link text-warning font-weight-bold "
                to="/login"
              >
                <span> Submit a job Offers </span>
                <sub>Login first >>> </sub>
              </NavLink>
            )}
          </li>
        </ul>
        {
          //Conditional Rendering
          !user && (
            <React.Fragment>
              <div className="form-inline my-2 my-lg-0">
                <NavLink
                  className=" nav-link justify-content-end my-2 my-sm-0 font-weight-bold"
                  to="/login"
                  style={{ "font-size": "20px" }}
                >
                  Login
                </NavLink>
              </div>
            </React.Fragment>
          )
        }
        {
          //Conditional Rendering
          user && (
            <React.Fragment>
              <div className="form-inline my-2 my-lg-0">
                <NavLink
                  className=" nav-link justify-content-end my-2 my-sm-0 font-weight-bold"
                  to="/user/edit"
                  style={{ "font-size": "20px" }}
                >
                  {user.sub}
                </NavLink>

                <NavLink
                  className=" nav-link justify-content-end my-2 my-sm-0 font-weight-bold"
                  to="/logout"
                  style={{ "font-size": "20px" }}
                >
                  Logout
                </NavLink>
              </div>
            </React.Fragment>
          )
        }
      </div>
    </nav>

    //*******************************
  );
};

export default NavBar;
