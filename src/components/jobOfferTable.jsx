import React, { Component } from "react";
import Like from "../common/like";
import Table from "../common/table";
import { Link } from "react-router-dom";
class jobOfferTable extends Component {
  columns = [
    {
      path: "title",
      label: "TITLE",
      content: j => <Link to={`/jobOffer/edit/${j.id}`}>{j.title}</Link>
    },
    { path: "description", label: "DESCRIPTION" },
    { path: "contractType", label: "CONTRACT TYPE" },

    { path: "startDate", label: "START DATE" },
    { path: "wages", label: "SALARY" },
    /*
    {
      path: "thumb",
      label: "LIKE or NOT",
      content: movie => (
        <Like thumb={movie.thumb} onClick={() => this.props.like(movie)} />
      )
    },
    */
    {
      key: "delete",
      label: "DELETE",
      content: jobOffer => (
        <button
          onClick={() => this.props.deleteJobOffer(jobOffer)}
          className="btn btn-outline-danger"
        >
          DELETE
        </button>
      )
    }
    //{key:"thumb"}
  ];

  render() {
    const {
      filteredJobListLength,
      paginatedJobList,
      like,
      deleteJobOffer,
      sortColumn,
      onSort
    } = this.props;

    return (
      <Table
        filteredJobListLength={filteredJobListLength}
        paginatedJobList={paginatedJobList}
        like={like}
        deleteJobOffer={deleteJobOffer}
        onSort={onSort}
        sortColumn={sortColumn}
        columns={this.columns}
      />
    );
  }
}

export default jobOfferTable;
