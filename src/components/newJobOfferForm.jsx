import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import offerCRUD from "../services/offerCRUDService";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class NewMovieForm extends Form {
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
      .regex(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)
      .required()
      .label("Start Date"),
    wages: Joi.number()
      .integer()
      .required()
      .label("Wages")
  };

  componentDidMount() {
    const contractType = [
      { _id: "0", name: "Any type" },
      { _id: "1", name: "Permanent" },
      { _id: "2", name: "Contractor" }
    ];

    this.setState({ listContractType: contractType });

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
    const { listContractType } = this.state;
    const {
      title,
      description,
      contractType,
      startDate,
      wages
    } = this.state.data;

    const contract = listContractType[contractType];

    //*****  call to server  *****
    console.log("call save offer");

    await offerCRUD.userSaveOffer(
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
    return (
      <div className="text-white">
        <h1>New Offer</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderDropDown(
            "contractType",
            "Contract Type",
            this.state.listContractType
          )}
          {this.renderTextArea("description", "Description")}
          {this.renderInput("startDate", "Start Date", "YYYY-MM-DD")}
          {this.renderInput("wages", "Wages")}
          {this.renderButton("Save Offer")}
        </form>
      </div>
    );
  }
}
export default NewMovieForm;
