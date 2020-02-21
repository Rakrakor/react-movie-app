import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import SearchBox from "./searchBox";
import Pagination from "../common/pagination";
import ListGroup from "../common/listGroup";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";

import _ from "lodash";
class Movies extends Component {
  state = {
    movies: [],
    listGenres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
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
      sortColumn,
      searchQuery
    } = this.state;

    //Funnel display:
    //1- filtering
    //2- sorting
    //3- paginating

    //Must be TRUTHY: currentGenre && currentGenre._id
    /*Previously: No Search QUERY used
    const filteredMovieGenreList =
      currentGenre && currentGenre._id
        ? movies.filter(m => m.genre._id === currentGenre._id)
        : movies;
*/

    // With Search Query:
    let filteredMovieGenreList = movies;
    if (searchQuery) {
      filteredMovieGenreList = movies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (currentGenre && currentGenre._id) {
      filteredMovieGenreList = movies.filter(
        m => m.genre._id === currentGenre._id
      );
      //same request as previously without searchQuery
    }

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

  //*** RULE ***: with controlled component, can not use NULL or UNDEFINED */
  handleGenre = genreParam => {
    this.setState({
      currentGenre: genreParam,
      searchQuery: "",
      currentPage: 1
    });
    // iff filter is applied we reset the currentPage to 1.
    // other no movies are showing if on the second page we select a filter
    // ex: max movies genre action:3. if we are on the page 2, no movies shows. Only they show on the 1st page.
  };

  handleSorting = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  render() {
    const {
      pageSize,
      currentPage,
      listGenres,
      currentGenre,
      sortColumn,
      searchQuery
    } = this.state;

    //*** ACCESS RIGHTS ***   USER Truthy/
    const { user } = this.props;

    console.log("currentPage", currentPage);
    console.log("GenreList:", listGenres);
    const { length: nbMovies } = this.state.movies;
    if (nbMovies === 0) {
      return <h1>There are no movie in DB</h1>;
    }

    const { filteredMoviesLength, paginatedMovieList } = this.getPageData();

    return (
      <div>
        <div className="row bg-light">
          <div className="col-3">
            <ListGroup
              listGenres={listGenres}
              currentGenre={currentGenre}
              onSelectGenre={this.handleGenre}
            />
          </div>

          <div className="col">
            <Link className="btn btn-primary mb-5" to="/movies/new">
              "New Movie"
            </Link>

            <SearchBox value={searchQuery} onChange={this.handleSearch} />

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
