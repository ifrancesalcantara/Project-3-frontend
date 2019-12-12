import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import { Link } from "react-router-dom";
import "./DetailsPainting.css";
import imgService from "../../lib/services/painting-service";

class PaintingDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paintingId: props.paintingId,
      paintingDetails: {}
    };
  }

  //HERE
  componentDidMount = async () => {
    const imgData = await imgService.getDetails(this.state.paintingId);
    this.setState({ paintingDetails: imgData });
    console.log("IN STATEEE", this.state.paintingDetails);
  };

  render() {
    const { user, isLoggedIn } = this.props;
    const {
      image,
      title,
      description,
      creator,
      creatorUsername,
      tags,
      updated_at
    } = this.state.paintingDetails;
    console.log("RIGHT HERE", user);
    return (
      <div className="details-div">
        {!this.state.paintingDetails ? null : isLoggedIn ? (
          <div>
            {!user ? null : user._id === creator ? (
              <button>DELETE</button>
            ) : null}
            <img src={image} alt="" />
            <p>{title}</p>
            <p>{description}</p>
            {!user ? null : user._id !== creator ? (
              <Link to={`/chat/${creator}/${user._id}`}>
                START A CHAT with {creator}
              </Link>
            ) : null}
            <p>By: {creatorUsername}</p>
            <p>Last update: {updated_at}</p>
          </div>
        ) : (
          <div>
            <img src={image} alt="" />
            <div>
              {!tags
                ? null
                : tags.map(tag => <span className="tag">{tag}</span>)}
            </div>
            <p>{title}</p>
            <p>{description}</p>

            <p>{creatorUsername}</p>
            <p>{JSON.stringify(this.state.paintingDetails)}</p>
          </div>
        )}
      </div>
    );
  }
}

export default withAuth(PaintingDetails);
