import React, { Component } from "react";

import { timeSince } from "./../../../lib/config/functions";

export default class CreationDate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { created_at } = this.props;
    return (
      <div className="creation-date">
        <p>Created {timeSince(Date.parse(created_at)) + " ago."}</p>
      </div>
    );
  }
}
