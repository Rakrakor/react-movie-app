import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import Pagination from "../common/pagination";
import ListGroup from "../common/listGroup";
import { paginate } from "../utils/paginate";
import NavBar from "./navBar";

import _ from "lodash";
class Movies extends Component {
  state = {
    movies: [],
    listGenres: [],
    pageSize: 4,
    currentPage: 1,
    currentGenre: null,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];

    this.setState({ movies: getMovies(), listGenres: genres });
  }

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      movies,
      currentGenre,
      sortColumn
    } = this.state;

    //Funnel display:
    //1- filtering
    //2- sorting
    //3- paginating

    //Must be TRUTHY: currentGenre && currentGenre._id
    const filteredMovieGenreList =
      currentGenre && currentGenre._id
        ? movies.filter(m => m.genre._id === currentGenre._id)
        : movies;

    const filteredNsortedMovieList = _.orderBy(
      filteredMovieGenreList,
      [sortColumn.path],
      [sortColumn.order]
    );

    const paginatedMovieList = paginate(
      filteredNsortedMovieList,
      currentPage,
      pageSize
    );

    const filteredMoviesLength = filteredMovieGenreList.length;

    return { filteredMoviesLength, paginatedMovieList };
  };

  handleDelete = movieToDelete => {
    const movies = this.state.movies.filter(m => m._id !== movieToDelete._id);

    this.setState({ movies });
  };

  handleLike = movieToLike => {
    console.log("Movie LIKED");

    const moviesClone = [...this.state.movies]; // [ ] : clone d'un tableau
    const index = moviesClone.indexOf(movieToLike);

    console.log("INDEX moviesClone:", index);

    moviesClone[index] = { ...moviesClone[index] };

    console.log("Like Before:", moviesClone[index].thumb);
    moviesClone[index].thumb = !moviesClone[index].thumb;
    console.log("Like After:", moviesClone[index].thumb);

    this.setState({ movies: moviesClone });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenre = genreParam => {
    this.setState({ currentGenre: genreParam, currentPage: 1 });
    // iff filter is applied we reset the currentPage to 1.
    // other no movies are showing if on the second page we select a filter
    // ex: max movies genre action:3. if we are on the page 2, no movies shows. Only they show on the 1st page.
  };

  handleSorting = sortColumn => {
    this.setState({ sortColumn });
  };

  render() {
    const {
      pageSize,
      currentPage,
      movies,
      listGenres,
      currentGenre,
      sortColumn
    } = this.state;
    console.log("currentPage", currentPage);
    console.log("GenreList:", listGenres);
    const { length: nbMovies } = this.state.movies;
    if (nbMovies === 0) {
      return <h1>There are no movie in DB</h1>;
    }

    const { filteredMoviesLength, paginatedMovieList } = this.getPageData();

    return (
      <div>
        <div>
          <NavBar />
        </div>

        <div className="row">
          <div className="col-3">
            <ListGroup
              listGenres={listGenres}
              currentGenre={currentGenre}
              onSelectGenre={this.handleGenre}
            />
          </div>

          <div className="col">
            <MoviesTable
              filteredMoviesLength={filteredMoviesLength}
              sortColumn={sortColumn}
              paginatedMovieList={paginatedMovieList}
              like={this.handleLike}
              deleteMovie={this.handleDelete}
              onSort={this.handleSorting}
            />

            <Pagination
              itemsCount={filteredMoviesLength}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
