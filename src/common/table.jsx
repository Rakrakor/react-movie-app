import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({
  filteredJobListLength,
  paginatedJobList,
  like,
  deleteJobOffer,
  onSort,
  sortColumn,
  columns
}) => {
  return (
    <React.Fragment>
      <p>You have captured {filteredJobListLength} job offers</p>

      <table className="table">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />

        <TableBody
          data={paginatedJobList}
          like={like}
          deleteMovie={deleteJobOffer}
          columns={columns}
        />
      </table>
    </React.Fragment>
  );
};

export default Table;
