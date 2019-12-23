import React, { Component } from "react";
import { Link } from "react-router-dom";

import {chatIcon} from "./../../../lib/config/images"

export default class ChatLink extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
      const { creator, creatorUsername, user } = this.props
    return (
      <div className="detail-creator-info-div">
        <p>
          By: <Link to={`/profile/${creator}`}>{creatorUsername}</Link>
        </p>

        {!user ? null : user._id !== creator ? (
          <Link to={`/chat/${creator}/${user._id}`}>
            <img src={chatIcon} alt="" />
          </Link>
        ) : null}
      </div>
    );
  }
}
