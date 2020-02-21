//3rd party Libraries
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

//Components
import Welcome from "./components/welcome";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import NewMovieForm from "./components/newMovieForm";
import MovieForm from "./components/movieForm";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import SkillsIT from "./components/skillsIT";
import SkillsProject from "./components/skillsProject";
import SkillsQuality from "./components/skillsQuality";
import SkillsChart from "./components/skillsChart";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import auth from "./services/authService";
//CSS files
import "./App.css";

class App extends Component {
  state = {
    user: ""
  };

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
    //Then component is re-render, and state passed to the props
  }

  render() {
    return (
      <React.Fragment>
        <NavBar user={this.state.user} />

        <main className="container">
          <Switch>
            <Route path="/welcome" component={Welcome} />
            <Route path="/movies/new" component={NewMovieForm} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/movies" render={props => <Movies {...props} />} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/skillsChart" component={SkillsChart} />
            <Route path="/skillsIT" component={SkillsIT} />
            <Route path="/skillsProject" component={SkillsProject} />
            <Route path="/skillsQuality" component={SkillsQuality} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/welcome" />
            <Redirect to="not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
