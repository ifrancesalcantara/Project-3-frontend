import React, { Component } from "react";
import { Link } from "react-router-dom";
import userService from "./../../lib/services/user-services";
import shortid from "shortid";

import "./ListPainting.css";

import LoadingGif from "./../LoadingGif";
import Image from "./../Image";
import LikeIcon from "./../DetailsPainting/Icon/LikeIcon";

import { handleLikeAndToggleImageSource } from "../../lib/config/functions";

export default class PaintingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paintings: props.paintings,
      handleLikeAndToggleImageSourceBinded: handleLikeAndToggleImageSource.bind(
        this
      )
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ paintings: nextProps.paintings });
  }

  addSeen(id) {
    userService.addSeen(id);
  }

  render() {
    return (
      <div className="painting-list-div">
        {!this.state.paintings ? (
          <LoadingGif />
        ) : !this.state.paintings.length ? (
          <h2 className="search-err">No matching paintings</h2>
        ) : (
          this.state.paintings.map((painting, i) => {
            return (
              <div key={shortid.generate()} className="painting-list-item">
                {!this.props.user ? null : !painting.usersWhoLiked.includes(
                    this.props.user._id
                  ) ? (
                  <LikeIcon
                    loggedIn
                    liked
                    userId={this.props.user._id}
                    id={painting._id}
                  />
                ) : (
                  <LikeIcon
                    loggedIn
                    userId={this.props.user._id}
                    id={painting._id}
                  />
                )}

                <Link
                  onClick={() => this.addSeen(painting._id)}
                  to={`/painting/${painting._id}`}
                >
                  <Image
                    src={painting.image}
                    view="home"
                    className="home-list-img"
                  />
                </Link>

                <div className="img-info">
                  <Link
                    onClick={() => this.addSeen(painting._id)}
                    to={`/painting/${painting._id}`}
                  >
                    <p className="list-title">{painting.title}</p>
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }
}
