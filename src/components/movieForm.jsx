import React from "react";

const MovieFrom = props => {
  const { match, history } = props;
  return (
    <div>
      {/*Note: with functional component, ca not do this.save()
       il faut passer une arrow function diretement*/}
      <h1>MOVIE FORM.{match.params.id}</h1>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/movies")}
      >
        Save
      </button>
    </div>
  );
};

export default MovieFrom;
