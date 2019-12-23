import React, { Component } from "react";
import "./Error404.css";

import { img404 } from "./../../lib/config/images";

import Navbar from "./../Navbar/Navbar";

export default class Error404 extends Component {
  render() {
    return (
      <div>
        <Navbar {...this.props}/>
        <div className="error-404">
          <img src={img404} alt="" />
          <h1>Oh, no!</h1>
          <h1> We were not able to find that page</h1>
          <p>It may have been deleted...</p>
        </div>
      </div>
    );
  }
}
