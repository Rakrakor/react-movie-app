import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import auth from "../services/authService";
import { NavLink } from "react-router-dom";

//ici on ajoute des methodes avec EXTENDS FORM
class LoginForm extends Form {
  state = {
    data: {
      //ALWAYS Initialize to an EMPTY STRING or VALUES from SERVER
      //Null or undefined would be an uncontrolled component
      username: "",
      userpassword: ""
    },
    errors: {}
  };
  //REGEX
  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    userpassword: Joi.string()
      .required()
      .label("Password")
  };

  //username = React.createRef();

  doSubmit = async () => {
    try {
      const { data } = this.state;
      //console.log(await login(data.username, data.userpassword));

      await auth.login(data.username, data.userpassword);

      //Every webBrowser have a local storage: ("Key",value)

      //*****  call to server  *****
      console.log("Submitted");
      //redirect the user to the home page:
      /****  this.props.history.push("/");   */
      //pb: once logged in. We can still see the login button.
      //Need to do a full reaload of the APP. ( navBar componentDidMount, happens just once)
      //We need to reload again:
      window.location = "/movies";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      //ici form n'est pas un composant.
      <div className="text-white">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("userpassword", "Password", "password")}
          {this.renderButton("Login")}
        </form>
        <NavLink
          className="nav-item nav-link justify-content-start font-weight-bold text-white mt-2 pl-0"
          to="/register"
        >
          Register here
        </NavLink>
      </div>
    );
  }
}

export default LoginForm;
