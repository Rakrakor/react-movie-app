import React, { Component } from "react";

//remove
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";

import auth from "../services/authService";
import offerServe from "../services/offerCRUDService";
import JobOfferTable from "./jobOfferTable";

import SearchBox from "./searchBox";
import Pagination from "../common/pagination";
import ListGroup from "../common/listGroup";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";

import _ from "lodash";
class JobOffer extends Component {
  state = {
    listOffers: [],
    listContractType: [],
    selectedContractType: null,

    //remove
    movies: [],
    listGenres: [],
    currentGenre: null,

    currentPage: 1,
    pageSize: 4,
    searchQuery: "",

    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    const contractType = [
      { _id: "0", name: "Any type" },
      { _id: "1", name: "Permanent" },
      { _id: "2", name: "Contractor" }
    ];
    this.setState({ listContractType: contractType });

    const roles = auth.parseUserCredentials();
    console.log("Roles after Parse:", roles);

    if (
      roles[0] &&
      roles[1] &&
      (roles[0].authority === "ADMIN" || roles[1].authority === "ADMIN")
    ) {
      console.log("roles.authority:", roles[0].authority);
      console.log("roles.authority:", roles[1].authority);
      console.log("FILTER for ADMIN -2 choices");
      this.setState({ listOffers: await offerServe.listAdminOffers() });
    } else if (roles[0] && roles[0].authority === "ADMIN") {
      console.log("FILTER for ADMIN - 1 choice");
      console.log("roles.authority:", roles[0].authority);
      this.setState({ listOffers: await offerServe.listAdminOffers() });
    } else {
      console.log("roles.authority:", roles[0].authority);
      console.log("FILTER for USER");
      this.setState({ listOffers: await offerServe.listUserOffers() });
    }

    console.log("ListOffers: ", this.state.listOffers);
    //remove
    //this.setState({ movies: getMovies(), listGenres: genres });
  }

  getPageData = () => {
    const {
      listOffers,
      selectedContractType,

      //remove
      movies,
      currentGenre,

      pageSize,
      currentPage,
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
    let filteredJobList = listOffers;
    if (searchQuery) {
      filteredJobList = listOffers.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (
      selectedContractType &&
      selectedContractType !== this.state.listContractType[0]
    ) {
      filteredJobList = listOffers.filter(
        j => j.contractType === selectedContractType.name
      );

      //same request as previously without searchQuery
    }

    const filteredSortedJobList = _.orderBy(
      filteredJobList,
      [sortColumn.path],
      [sortColumn.order]
    );

    const paginatedJobList = paginate(
      filteredSortedJobList,
      currentPage,
      pageSize
    );

    const filteredJobListLength = filteredJobList.length;

    return { filteredJobListLength, paginatedJobList };
  };

  handleDelete = jobToDelete => {
    /*
    const listOffers = this.state.listOffers.filter(
      j => j.id !== jobToDelete.id
    );
    */
    offerServe.deleteOffer(jobToDelete.id);
    window.location.reload();
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
  handleContract = contractParam => {
    this.setState({
      selectedContractType: contractParam,
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
    this.setState({
      searchQuery: query,
      selectedContractType: null,
      currentPage: 1
    });
  };

  render() {
    const {
      pageSize,
      currentPage,
      listContractType,
      selectedContractType,

      //remove
      listGenres,
      currentGenre,

      sortColumn,
      searchQuery
    } = this.state;

    console.log("currentPage", currentPage);
    console.log("listContractType:", listContractType);
    let nbOffers = 0;
    if (this.state.listOffers !== null) {
      nbOffers = this.state.listOffers.length;
    }

    if (nbOffers === 0) {
      return (
        <div>
          <h1 className="text-white">you have no job offer listed</h1>
          <Link className=" font-weight-bold pr-5 mr-5" to="/jobOffer/new">
            Submit my 1st Job Offer
          </Link>
        </div>
      );
    }

    const { filteredJobListLength, paginatedJobList } = this.getPageData();

    return (
      <div className="w3-content">
        <div className="w3-row-padding bg-light">
          <div className="w3-container w3-third mt-3 mb-3">
            <Link className="btn btn-primary mt-3 mb-3" to="/jobOffer/new">
              "Submit another Job Offer"
            </Link>
            <h3 className="mt-1 mtb-1">--- Filters ---</h3>
            <ListGroup
              listContractType={listContractType}
              selectedContractType={selectedContractType}
              onSelectContract={this.handleContract}
            />
            <h3 className="mt-1 mtb-1">--- Search ---</h3>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
          </div>

          <div className="w3-container w3-twothird mt-3 mb-3">
            <h3 className="mt-1 mtb-1">--- My list of offers ---</h3>

            <JobOfferTable
              filteredJobListLength={filteredJobListLength}
              sortColumn={sortColumn}
              paginatedJobList={paginatedJobList}
              like={this.handleLike}
              deleteJobOffer={this.handleDelete}
              onSort={this.handleSorting}
            />

            <Pagination
              itemsCount={filteredJobListLength}
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

export default JobOffer;
