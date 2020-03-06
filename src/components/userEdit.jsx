import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import userCRUD from "../services/userCRUDservice";
const tokenKey = "token";
//ici on ajoute des methodes avec EXTENDS FORM
class UserEdit extends Form {
  state = {
    data: {
      //ALWAYS Initialize to an EMPTY STRING or VALUES from SERVER
      //Null or undefined would be an uncontrolled component
      username: "",
      //userpassword: "",
      email: "",
      phonenumber: "",
      usercompany: ""
    },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .email()
      .label("Email"),
    username: Joi.string()
      .allow("")
      .label("Username"),
    phonenumber: Joi.string()
      .allow("")
      .label("PhoneNumber"),
    usercompany: Joi.string()
      .allow("")
      .label("Company")
  };

  async componentDidMount() {
    const { data } = this.state;

    const userPreLoad = await userCRUD.getUserProfile();

    data.username = userPreLoad.username;
    // data.password = userPreLoad.password;
    data.email = userPreLoad.email;
    data.phonenumber = userPreLoad.phonenumber;
    data.usercompany = userPreLoad.usercompany;

    this.setState({ data });
    console.log("PreloadParamsLOADED:", this.state.data);
  }

  doSubmit = async () => {
    const { username, email, phonenumber, usercompany } = this.state.data;

    //temp: userpassword
    const tempPassword = "";
    //*****  call to server  *****

    const updatedToken = await userCRUD.saveUserProfile(
      username,
      tempPassword,
      email,
      phonenumber,
      usercompany
    );

    console.log("updatedToken:", updatedToken);
    console.log("Submitted");

    this.props.history.push("/welcome");
  };

  render() {
    return (
      <div className="text-white">
        <h1>UPDATE PROFILE</h1>
        <h6>
          * <i>your profile will be updated upon reconnection</i>
        </h6>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}

          {this.renderInput("username", "UserName")}
          {this.renderInput("phonenumber", "PhoneNumber")}
          {this.renderInput("usercompany", "Company")}
          {this.renderButton("Update")}
        </form>
      </div>
    );
  }
}

export default UserEdit;
