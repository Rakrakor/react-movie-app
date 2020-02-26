import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import DropDown from "./dropDown";
import TextArea from "./textArea";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const JOIoptions = {
      abortEarly: false
    };
    const { error } = Joi.validate(this.state.data, this.schema, JOIoptions);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
      console.log("Liste Errors:", item.message);
      return errors;
    }
  };

  validateProperty = ({ name, value }) => {
    //ce que l'operateur a entré
    const obj = { [name]: value }; // [name] va changer dynamiquement. value is what the user typed in the field
    console.log("objet", obj);
    //ce que la RegEx mentionne
    const schema = { [name]: this.schema[name] };
    console.log("schema de Valid", schema);
    //Validation de la donnee saisie
    const { error } = Joi.validate(obj, schema); // we want to abort early
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    // REMOVE to use SERVER AUTH
    e.preventDefault();

    const errors = this.validate();

    //if no Error -> set null. Pas possible.
    //donc on met un object a stocker si error est null
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };
  //currentTarget.name OR currentTarget.value
  handleChange = ({ currentTarget: input }) => {
    //to Validate error message on the go
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input); //validate vs RegEx
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }

    //data.username = e.currentTarget.value;
    const data = { ...this.state.data };
    //on insere la valeur saisie ds le state, a l'endroit du nom
    data[input.name] = input.value;
    // .name and .value are REFERENCED in the INPUT fields of
    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        inputLabel={label}
        name={name}
        value={data[name]}
        onChange={this.handleChange}
        placeholder={type}
        errors={errors[name]}
      />
    );
  }

  renderDropDown(name, label, listContractType) {
    const { data, errors } = this.state;
    return (
      <DropDown
        name={name}
        value={data[name]}
        inputLabel={label}
        listContractType={listContractType}
        onChange={this.handleChange}
        errors={errors[name]}
      />
    );
  }

  renderTextArea(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <TextArea
        type={type}
        inputLabel={label}
        name={name}
        value={data[name]}
        onChange={this.handleChange}
        errors={errors[name]}
      />
    );
  }
}
export default Form;
