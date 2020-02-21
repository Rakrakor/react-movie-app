import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import { signin } from "../services/authService";

//ici on ajoute des methodes avec EXTENDS FORM
class RegisterForm extends Form {
  state = {
    data: {
      //ALWAYS Initialize to an EMPTY STRING or VALUES from SERVER
      //Null or undefined would be an uncontrolled component
      username: "",
      userpassword: "",
      email: "",
      phonenumber: "",
      usercompany: ""
    },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    userpassword: Joi.string()
      .min(5)
      .required()
      .label("Userpassword"),
    username: Joi.string()
      .required()
      .label("Username"),
    phonenumber: Joi.string()
      .allow("")
      .label("PhoneNumber"),
    usercompany: Joi.string()
      .allow("")
      .label("Company")
  };

  //username = React.createRef();

  doSubmit = async () => {
    const { data } = this.state;
    //*****  call to server  *****
    const response = await signin(
      data.username,
      data.userpassword,
      data.email,
      data.phonenumber,
      data.usercompany
    );
    console.log("Response Register:", response);
    console.log("Submitted");
    this.props.history.push("/login");
  };

  render() {
    return (
      <div className="text-white">
        <h1>REGISTRATION</h1>
        <sub style={{ color: "red" }}>* :required</sub>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "* Email")}
          {this.renderInput("userpassword", "* UserPassword", "password")}
          {this.renderInput("username", "* UserName")}
          {this.renderInput("phonenumber", "PhoneNumber")}
          {this.renderInput("usercompany", "Company")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
