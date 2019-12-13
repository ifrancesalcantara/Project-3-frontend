import React, { Component } from "react";

import Navbar from "../components/Navbar/Navbar";
import PaintingDetails from "../components/DetailsPainting/DetailsPainting";
import { withAuth } from "../lib/AuthProvider";

class Painting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Navbar  {...this.props}/>
        <PaintingDetails {...this.props} paintingId={this.props.match.params.paintingId} />
      </div>
    );
  }
}

export default withAuth(Painting);
