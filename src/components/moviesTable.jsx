import React, { Component } from "react";
import Like from "../common/like";
import Table from "../common/table";
import { Link } from "react-router-dom";
class moviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "TITLE",
      content: m => <Link to={`/movies/${m._id}`}>{m.title}</Link>
    },
    { path: "genre.name", label: "CONTRACT TYPE" },
    { path: "numberInStock", label: "START DATE" },
    { path: "dailyRentalRate", label: "SALARY" },
    {
      path: "thumb",
      label: "LIKE or NOT",
      content: movie => (
        <Like thumb={movie.thumb} onClick={() => this.props.like(movie)} />
      )
    },
    {
      key: "delete",
      label: "DELETE",
      content: movie => (
        <button
          onClick={() => this.props.deleteMovie(movie)}
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
      filteredMoviesLength,
      paginatedMovieList,
      like,
      deleteMovie,
      sortColumn,
      onSort
    } = this.props;

    return (
      <Table
        filteredMoviesLength={filteredMoviesLength}
        paginatedMovieList={paginatedMovieList}
        like={like}
        deleteMovie={deleteMovie}
        onSort={onSort}
        sortColumn={sortColumn}
        columns={this.columns}
      />
    );
  }
}

export default moviesTable;
