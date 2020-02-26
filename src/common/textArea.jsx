import React from "react";

//simplification:
const TextArea = ({ name, inputLabel, errors, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{inputLabel}</label>
      <textarea
        className="form-control"
        {...rest}
        id={name}
        name={name}
        input={name}
        placeholder={name}
        rows="3"
      ></textarea>

      {errors && <div className="alert alert-danger">{errors}</div>}
    </div>
  );
  /*
const Input = ({ type, name, inputLabel, value, onChange, errors }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{inputLabel}</label>
      <input
        id={name}
        input={name}
        autoFocus
        
       *** RULE ***:  {...rest}: automatically fills field={field} parameter from the PROPS object 
        name={name}
        value={value}
        onChange={onChange}
        type={type}

        className="form-control"
      />
      {errors && <div className="alert alert-danger">{errors}</div>}
    </div>
  );
  */
};

export default TextArea;
