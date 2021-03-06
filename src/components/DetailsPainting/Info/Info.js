import React, { Component } from "react";
import { Link } from "react-router-dom";

import SeenIcon from "./../Icon/SeenIcon";
import LikeIcon from "./../Icon/LikeIcon";

export default class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { timesSeen, user, paintingId, game, loggedIn } = this.props;
    return (
      <div>
        {loggedIn ? (
          <div className="details-view-info">
            <SeenIcon timesSeen={timesSeen} />
            {!this.props.user ? null : (
              <div>
                <LikeIcon
                  loggedIn
                  includeLikes
                  userId={user._id}
                  id={paintingId}
                />
              </div>
            )}
            <span className="details-game">
              <Link to={`/?game=${game}`}>{game}</Link>
            </span>
          </div>
        ) : (
          <div className="details-view-info">
            <SeenIcon timesSeen={timesSeen} />
            <LikeIcon />
            <span className="details-game">
              <Link to={`/?game=${game}`}>{game}</Link>
            </span>
          </div>
        )}
      </div>
    );
  }
}
