import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({
  filteredMoviesLength,
  paginatedMovieList,
  like,
  deleteMovie,
  onSort,
  sortColumn,
  columns
}) => {
  return (
    <React.Fragment>
      <p>There are {filteredMoviesLength} in DB</p>

      <table className="table">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />

        <TableBody
          data={paginatedMovieList}
          like={like}
          deleteMovie={deleteMovie}
          columns={columns}
        />
      </table>
    </React.Fragment>
  );
};

export default Table;
