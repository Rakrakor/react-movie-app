import React from "react";

const listGroup = ({
  listGenres,
  currentGenre,
  onSelectGenre,
  textProperty,
  valueProperty
}) => {
  console.log("Component_listGenres", listGenres);
  return (
    <ul className="list-group">
      {listGenres.map(genre => (
        <li
          key={genre[valueProperty]}
          className={
            genre === currentGenre
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onSelectGenre(genre)}
        >
          {genre[textProperty]}
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
