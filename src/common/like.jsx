import React, { Component } from "react";
// get our fontawesome imports

class Like extends Component {
  render() {
    const { thumb } = this.props;

    /*
    <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
    */

    let classes = "fa fa-thumbs-o-";
    if (!thumb) {
      classes += "down";
    } else {
      classes += "up";
    }

    console.log("classes:", classes);
    return (
      <i
        onClick={this.props.onClick}
        className={classes}
        style={{ cursor: "pointer" }}
        aria-hidden="true"
      ></i>
    );
  }
}

export default Like;
