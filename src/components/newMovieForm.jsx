import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class NewMovieForm extends Form {
  state = {
    data: {
      //ALWAYS Initialize to an EMPTY STRING or VALUES from SERVER
      //Null or undefined would be an uncontrolled component
      // _id: "",
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],
    errors: {}
  };

  schema = {
    //_id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .integer()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Rate")
  };

  componentDidMount() {
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
  }

  doSubmit = () => {
    //*****  call to server  *****

    saveMovie(this.state.data);
    this.props.history.push("/movies");
    // ICI le movie est en memoire locale.
    // la page "/movie" is re render. And the movie list is updated.

    console.log("Submitted");
  };

  render() {
    return (
      <div className="text-white">
        <h1>New Movie</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderDropDown("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}

          {this.renderButton("Save Movie")}
        </form>
      </div>
    );
  }
}
export default NewMovieForm;
