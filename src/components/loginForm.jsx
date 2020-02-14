import React, { Component } from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import { login } from "../services/authService";

//ici on ajoute des methodes avec EXTENDS FORM
class LoginForm extends Form {
  state = {
    data: {
      //ALWAYS Initialize to an EMPTY STRING or VALUES from SERVER
      //Null or undefined would be an uncontrolled component
      username: "",
      password: ""
    },
    errors: {}
  };
  //REGEX
  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  //username = React.createRef();

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const { data: jwt } = await login(data.username, data.password);
      console.log(jwt);
      //Every webBrowser have a local storage: ("Key",value)
      localStorage.setItem("token", jwt);
      //*****  call to server  *****
      console.log("Submitted");
      //redirect the user to the home page:
      this.props.history.push("/");
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
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
