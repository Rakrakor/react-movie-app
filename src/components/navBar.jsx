import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

/*NavLink allows to highlight the active class */

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Vidly
        </Link>

        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/movies">
            Movies
          </NavLink>

          <NavLink className="nav-item nav-link" to="/customers">
            Customers
          </NavLink>

          <NavLink className="nav-item nav-link" to="/rentals">
            Rentals
          </NavLink>

          <NavLink className="nav-item nav-link" to="/skillsChart">
            SkillsChart
          </NavLink>

          <NavLink className="nav-item nav-link" to="/skillsSet">
            SkillsSet
          </NavLink>

          <NavLink className="nav-item nav-link" to="/login">
            LoginForm
          </NavLink>

          <NavLink className="nav-item nav-link" to="/register">
            RegisterForm
          </NavLink>
        </div>
      </nav>
    );
  }
}

export default NavBar;
