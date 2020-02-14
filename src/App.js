import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import NewMovieForm from "./components/newMovieForm";
import MovieForm from "./components/movieForm";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import SkillsSet from "./components/skillsSet";
import SkillsChart from "./components/skillsChart";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";

import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />

        <main className="container">
          <Switch>
            <Route path="/movies/new" component={NewMovieForm} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/movies" exact component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/skillsChart" component={SkillsChart} />
            <Route path="/skillsSet" component={SkillsSet} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
