import React, { Component } from "react";
import { Link } from "react-router-dom";

/*NavLink allows to highlight the active class */

class NavBar extends Component {
  render() {
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

      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <Link className="navbar-brand font-weight-bold pr-5 mr-5" to="/">
          Developer.
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <Link className="nav-item nav-link " to="/welcome">
                Welcome
              </Link>
            </li>
            <li class="nav-item">
              <Link className="nav-item nav-link" to="/skillsChart">
                Areas of Experience
              </Link>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Detailed skills
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link class="dropdown-item" to="/skillsIT">
                  I.T
                </Link>
                <div class="dropdown-divider"></div>
                <Link class="dropdown-item" to="/skillsProject">
                  Project Management
                </Link>

                <Link class="dropdown-item" to="skillsQuality">
                  Quality/ Certification
                </Link>
              </div>
            </li>
          </ul>
          {/*
          <form class="form-inline my-2 my-lg-0">
            <div>
              <Link
                className="nav-item nav-link justify-content-end my-2 my-sm-0"
                to="/login"
              >
                Login
              </Link>
            </div>
          </form>
          */}
        </div>
      </nav>

      //*******************************
    );
  }
}

export default NavBar;
