import React from "react";

const DropDown = ({ name, inputLabel, listContractType, errors, ...rest }) => {
  console.log("DropDown- listContractType:", listContractType);
  return (
    <div className="form-group">
      <label htmlFor={name}>{inputLabel}</label>

      <select {...rest} id={name} name={name} className="form-control">
        <option value="" />
        {listContractType.map(contractType => (
          <option
            key={contractType._id}
            value={contractType._id}
            select={contractType.selected}
          >
            {contractType.name}
          </option>
        ))}
      </select>
      {errors && <div className="alert alert-danger">{errors}</div>}
    </div>
  );
};

export default DropDown;
