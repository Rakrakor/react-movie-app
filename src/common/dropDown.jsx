import React, { Component } from "react";

const DropDown = ({ name, inputLabel, genres, errors, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{inputLabel}</label>

      <select {...rest} id={name} name={name} className="form-control">
        <option value="" />
        {genres.map(genre => (
          <option key={genre._id} value={genre._id}>
            {genre.name}
          </option>
        ))}
      </select>
      {errors && <div className="alert alert-danger">{errors}</div>}
    </div>
  );
};

export default DropDown;
