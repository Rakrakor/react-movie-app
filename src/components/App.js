//************ 3rd party libraries
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";
//************ Components
import NavBar from "./components/navbar";
import Products from "./components/products";
import Posts from "./components/posts";
import Home from "./components/home";
import Dashboard from "./components/admin/dashboard";
import ProductDetails from "./components/productDetails";
import NotFound from "./components/notFound";
//************ CSS modules
import "./App.css";

class App extends Component {
  state = {};

  componentDidMOunt() {
    //Install Tool: jwt-decode@2.2.0
    const jwt = localStorage.getItem("token");
    const user = jwtDecode(jwt);
    console.log("Current User:", user);
    console.log("Current User:");
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="content">
          {/*
          The Route component can be used anywhere
          
          Order from the most Specific to the most generic path
          Switch is used to pic only 1 path. Alternative solution is to use 
          the word "exact" in front of the component.

          To know about React-Router : https://reacttraining.com/react-router/core/guides/philosophy
          see PROPS: history/ Location / Match

          To Pass custom PROS, see the 1st and 2nd Route example under.
          The 2nd passes all the parameters along with intials PROPS (history etc..)
          
          Optional Route Param: ex: /posts/:year?/:month?"
          the ? makes the param optional. Otherwise the Switch goes to the next route>
          */}

          <Switch>
            <Route path="/products/:id" component={ProductDetails} />
            <Route
              path="/products"
              render={props => <Products sortBy="newest" {...props} />}
            />
            <Route path="/posts/:year?/:month?" component={Posts} />
            <Route path="/admin" component={Dashboard} />
            <Redirect from="/messages" to="/posts" />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact component={Home} />

            <Redirect to="not-found" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
