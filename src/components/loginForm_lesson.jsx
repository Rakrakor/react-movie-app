import React, { Component } from "react";
import Input from "../common/input";
import Joi from "joi-browser";

class LoginForm extends Component {
  //single source of Truth:
  //in the Fields, add value={} / onChange={} method
  state = {
    account: {
      //ALWAYS Initialize to an EMPTY STRING or VALUES from SERVER
      //Null or undefined would be an uncontrolled component
      username: "",
      password: ""
    },

    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };
  //to validate the entire form
  validate = () => {
    //Beginning: schema solution 2nd Method of validation
    //by default, Joi aborts at first mistake. The entire form errors are not loaded
    const JOIoptions = {
      abortEarly: false
    };
    const { error } = Joi.validate(this.state.account, this.schema, JOIoptions);
    //on reccupere les erreurs et on les MAP sur state.errors
    if (!error) return null;
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
      return errors;
    }

    //End: schema solution 2nd Method of validation

    /*Beginning: 1st Method of Validation 

    console.log("Schema result:", result);
    //End: schema solution

    //We mention username: or password:
    //They automatically MAP to Account.username
    //or Account.password:
    const { account } = this.state;
    const errors = {};
    if (account.username.trim() === "") {
      //trim() removes all spaces in a string
      errors.username = "username is required";
    }
    if (account.password.trim() === "") {
      //trim() removes all spaces in a string
      errors.password = "Password is required";
    }

    return Object.keys(errors).length === 0 ? null : errors;
    
*/ //End:1st Method of validation

    //return { username: "Username is required" };
  };

  //to validate only one property
  validateProperty = ({ name, value }) => {
    //Beginning 2nd Method JOI
    const obj = { [name]: value }; // [name] va changer dynamiquement.
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema); // we want to abort early
    return error ? error.details[0].message : null;
    //End: 2nd Method

    /*Beginning: 1st method
    //input.name et input.value
    if (name === "username") {
      if (value.trim() === "") {
        return "Username is required";
      }
    }
    if (name === "password") {
      if (value.trim() === "") {
        return "Password is required";
      }
    }
    End: 1st method */
  };

  username = React.createRef();

  /*
  componentDidMount() {
    this.username.current.focus();
  }
  */

  handleSubmit = e => {
    //preventDefault is used to remove direct submission to SERVER
    // REMOVE to use SERVER AUTH
    e.preventDefault();

    const errors = this.validate();

    //if no Error -> set null. Pas possible.
    //donc on met un object a stocker si error est null
    this.setState({ errors: errors || {} });
    if (errors) return; // if errors is Truthy, we don't submit to server

    //*****  call to server  *****
    console.log("Submitted");

    //a) In a simple DOM we would acccess field this way
    //--> const username=document.getElementById('username').value;
    //b) In React we used the following method:
    // username=React.createRef();  See Top of this class
    // and insert the ref in the INPUT fiels under
    //puis on reccupere le username de cette facon

    /* const username = this.username.current.value; */

    //pour le Focus: soit dans componentDidMount / Soit autoFocus dans le champs

    //single source of Truth:
    //Add State,
    //in the Fields, add value={} / onChange={} method
  };

  //e is the event
  /*
  handleChange = e => {
    const account = { ...this.state.account };
    //account.username = e.currentTarget.value;
    account[e.currentTarget.name] = e.currentTarget.value;
    //name is REFERENCED in the INPUT filed
    this.setState({ account });
  };
*/
  //refactoring of handleChange:
  handleChange = ({ currentTarget: input }) => {
    //Beginning: to Validate error message on the go
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }
    //End: to Validate error message on the go

    //account.username = e.currentTarget.value;
    //Generalisation a ts les champs:
    //*** RULE ***: to work with Objects DYNAMICALLY,
    //we use brackets instead of dots.
    const account = { ...this.state.account };
    account[input.name] = input.value;
    // .name and .value are REFERENCED in the INPUT fields of
    this.setState({ account });
  };
  //*** RULE ***: controlled component get state via PROPS.
  // They update state via event handler methods
  //instead of passing PROPS. We can just EXTENDS the component
  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            inputLabel="Username"
            name="username"
            value={account.username}
            onChange={this.handleChange}
            errors={errors.username}
          />

          <Input
            inputLabel="Password"
            name="password"
            value={account.password}
            onChange={this.handleChange}
            errors={errors.password}
          />

          {/*
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              value={account.password}
              onChange={this.handleChange}
              name="password"
              ref={this.password}
              input="password"
              type="text"
              className="form-control"
            />
          </div>
         */}

          <button
            disabled={this.validate()}
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
