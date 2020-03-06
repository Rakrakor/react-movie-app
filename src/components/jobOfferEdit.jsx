import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import offerCRUD from "../services/offerCRUDService";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import offerCRUDService from "../services/offerCRUDService";

class JobOfferEdit extends Form {
  state = {
    data: {
      //ALWAYS Initialize to an EMPTY STRING or VALUES from SERVER
      //Null or undefined would be an uncontrolled component
      // _id: "",
      title: "",
      contractType: "",
      description: "",
      startDate: "",
      wages: ""

      //genreId: "",
      //numberInStock: "",
      //dailyRentalRate: ""
    },
    listContractType: [],

    // genres: [],
    errors: {}
  };

  schema = {
    //_id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    contractType: Joi.string()
      .required()
      .label("Contract Type"),
    description: Joi.string()
      .required()
      .label("Description"),
    startDate: Joi.string()
      .required()
      .label("Start Date"),
    wages: Joi.number()
      .integer()
      .required()
      .label("Wages")
  };

  async componentDidMount() {
    const { match } = this.props;
    const { data, listContractType } = this.state;
    const offerRef = match.params.id;

    const contractType = [
      { _id: "0", name: "Any type" },
      { _id: "1", name: "Permanent" },
      { _id: "2", name: "Contractor" }
    ];

    this.setState({ listContractType: contractType });

    const offerPreLoad = await offerCRUD.userFindAnOffer(offerRef);
    const contractTabRef = this.state.listContractType.filter(
      c => c.name === offerPreLoad.contractType
    );

    console.log("contractTabRef", contractTabRef);
    console.log("PreloadParamsBEFORE:", offerPreLoad);
    data.title = offerPreLoad.title;
    data.contractType = contractTabRef;
    data.description = offerPreLoad.description;
    data.startDate = offerPreLoad.startDate;
    data.wages = offerPreLoad.wages;

    this.setState({ data });
    console.log("PreloadParamsLOADED:", this.state.data);

    //remove
    /*
    const genres = getGenres();
    this.setState({ genres });
    //reccuperation de l'URI "/new"
    const movieId = this.props.match.params.id;
    if (movieId !== "new") {
      return;
    }
    //if movie is not new and exists:
    const movie = getMovie(movieId);
    if (!movie) {
      //replace. Not push.
      //we don't want the user to comeback on
      //a wrong page
      return this.props.history.replace("/not-found");
    }
    // *** RULE ***: the element we get from the serve,
    // is adapted to another model matching the view (i.e genreId)
    this.setState({ data: this.mapToViewModel(movie) });
  }
  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.rate
    };
    */
  }

  doSubmit = async () => {
    const offerRef = this.props.match.params.id;
    const { listContractType } = this.state;
    const {
      title,
      description,
      contractType,
      startDate,
      wages
    } = this.state.data;

    const contract = listContractType[contractType];
    console.log(
      "DATA before UPDATE:",
      offerRef,
      title,
      description,
      contract.name,
      startDate,
      wages
    );
    //*****  call to server  *****
    console.log("call save offer");

    await offerCRUD.updateOffer(
      offerRef,
      title,
      description,
      contract.name,
      startDate,
      wages
    );

    //remove
    // saveMovie(this.state.data);
    this.props.history.push("/jobOffers");
    // ICI le movie est en memoire locale.
    // la page "/movie" is re render. And the movie list is updated.

    console.log("Submitted");
  };

  render() {
    const { match } = this.props;
    return (
      <div className="text-white">
        {/*Note: with functional component, ca not do this.save()
        il faut passer une arrow function diretement*/}
        <h1 className="text-white">Job Offer {match.params.id}</h1>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderDropDown(
            "contractType",
            "Contract Type",
            this.state.listContractType
          )}
          {this.renderTextArea("description", "Description")}
          {this.renderInput("startDate", "Start Date")}
          {this.renderInput("wages", "Wages")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default JobOfferEdit;
