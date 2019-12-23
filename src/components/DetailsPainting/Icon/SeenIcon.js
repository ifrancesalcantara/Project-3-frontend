import React, { Component } from "react";

import { seenImg } from "../../../lib/config/images";

export default class SeenIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { timesSeen } = this.props;
    return (
      <div>
        <img className="edit-seenTimes" src={seenImg} alt="" />
        <span>{timesSeen}</span>
      </div>
    );
  }
}
