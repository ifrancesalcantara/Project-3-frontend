import React, { Component } from "react";

import { img404 } from "./../../lib/config/images"

export default class Error404 extends Component {
  render() {
    return (
      <div className="error-404">
        <img
          src={img404}
          alt=""
        />
        <h1>Oh, no!</h1>
        <h1> We were not able to find that painting</h1>
        <p>It may have been deleted...</p>
      </div>
    );
  }
}
