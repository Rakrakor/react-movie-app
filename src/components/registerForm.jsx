import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";

//ici on ajoute des methodes avec EXTENDS FORM
class RegisterForm extends Form {
  state = {
    data: {
      //ALWAYS Initialize to an EMPTY STRING or VALUES from SERVER
      //Null or undefined would be an uncontrolled component
      username: "",
      password: "",
      name: ""
    },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .email()
      .required()
      .label("Username"),
    password: Joi.string()
      .min(5)
      .required()
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  username = React.createRef();

  doSubmit = () => {
    //*****  call to server  *****
    console.log("Submitted");
  };

  render() {
    return (
      <div className="text-white">
        <h1>REGISTRATION</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
