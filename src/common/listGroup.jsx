import React from "react";

const listGroup = ({
  listContractType,
  selectedContractType,
  onSelectContract,

  listGenres,
  currentGenre,
  onSelectGenre,

  textProperty,
  valueProperty
}) => {
  console.log("Component_listContractType:", listContractType);
  return (
    <ul className="list-group">
      {listContractType.map(contract => (
        <li
          key={contract[valueProperty]}
          className={
            contract === selectedContractType
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onSelectContract(contract)}
        >
          {contract[textProperty]}
        </li>
      ))}
    </ul>
  );
};

//permet de generaliser le composant.
//Car le composant ne reccuperera pas toujours le meme type de parameteres
//no need to pass parameters via props interface
listGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default listGroup;
