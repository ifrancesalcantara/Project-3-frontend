import React, { Component } from "react";
import { Link } from "react-router-dom";

import paintingService from "./../../../lib/services/painting-service"

import { filledStar, emptyStar } from "../../../lib/config/images";
import { handleLikeAndToggleImageSource } from "../../../lib/config/functions";

export default class Icon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersWhoLiked: null,
      handleLikeAndToggleImageSourceBinded: handleLikeAndToggleImageSource.bind(
        this
      )
    };
  }

  componentDidMount=async ()=>{
    const paintingDetails=await paintingService.getDetails(this.props.id)
    this.setState({usersWhoLiked: paintingDetails.usersWhoLiked})
  }

  render() {
    const { loggedIn, id, userId, includeLikes } = this.props;
    const { usersWhoLiked, handleLikeAndToggleImageSourceBinded } = this.state;
    return (
      <span>
        {!usersWhoLiked ? null : loggedIn ? (
          includeLikes ? (
            usersWhoLiked.includes(userId) ? (
              <div>
                <img
                  className="details-filledStar"
                  onClick={e => handleLikeAndToggleImageSourceBinded(e, userId)}
                  src={filledStar}
                  alt={id} //!!! CUSTOM ID OR OTHER WAY TO PASS IT. Data-NOT WORKING
                />
                <span id="likes-qty">{usersWhoLiked.length}</span>
              </div>
            ) : (
              <div>
                <img
                  onClick={e => handleLikeAndToggleImageSourceBinded(e, userId)}
                  className="details-emptyStar"
                  src={emptyStar}
                  alt={id} //!!! CUSTOM ID OR OTHER WAY TO PASS IT. Data-NOT WORKING
                />
                <span id="likes-qty">{usersWhoLiked.length}</span>
              </div>
            )
          ) : usersWhoLiked.includes(userId) ? (
            <div>
              <img
                className="filledStar"
                onClick={e => handleLikeAndToggleImageSourceBinded(e, userId)}
                src={filledStar}
                alt={id} //!!! CUSTOM ID OR OTHER WAY TO PASS IT. Data-NOT WORKING
              />
            </div>
          ) : (
            <div>
              <img
                onClick={e => handleLikeAndToggleImageSourceBinded(e, userId)}
                className="emptyStar"
                src={emptyStar}
                alt={id} //!!! CUSTOM ID OR OTHER WAY TO PASS IT. Data-NOT WORKING
              />
            </div>
          )
        ) : !usersWhoLiked ? null : (
          <div>
            <Link to="/login">
              <img src={emptyStar} alt="" />
            </Link>
            <span>{usersWhoLiked.length}</span>
          </div>
        )}
      </span>
    );
  }
}
