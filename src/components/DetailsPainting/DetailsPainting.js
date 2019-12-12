import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import { Link } from "react-router-dom";
import "./DetailsPainting.css";
import paintingService from "../../lib/services/painting-service";
import ReactImageMagnify from "react-image-magnify";

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
    const imgData = await paintingService.getDetails(this.state.paintingId);
    this.setState({ paintingDetails: imgData });
  };

  timeSince = date => {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  };

  deleteMe = () => {
    paintingService.delete(this.state.paintingId);
    this.props.history.push("/"); //!!! Not refrechind with deletion
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
      updated_at,
      game
    } = this.state.paintingDetails;
    return (
      <div className="details-div">
        {!this.state.paintingDetails ? null : isLoggedIn ? (
          <div>
            {!user ? null : user._id === creator ? (
              <button
                onClick={() => {
                  this.deleteMe();
                }}
              >
                DELETE
              </button>
            ) : null}
            <ReactImageMagnify  //!!!
              enlargedImagePosition="over"
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: image,
                  width: "90px",
                  height: "auto"
                },
                largeImage: {
                  src: image,
                  width: 500,
                  height: 500
                }
              }}
            />
            <a
              href="large.jpg"
              className="MagicZoom"
              data-options="zoomWidth:400px; zoomHeight:400px"
            >
              <img src="small.jpg" alt="" />
            </a>
            <p className="details-title">{title}</p>
            <p>{description}</p>
            {!user ? null : user._id !== creator ? (
              <Link to={`/chat/${creator}/${user._id}`}>
                START A CHAT with {creator}
              </Link>
            ) : null}
            <p>By: {creatorUsername}</p>
            {!tags ? null : tags.map(tag => <span className="tag">{tag}</span>)}
            {game}
            <p>
              Last updated: {this.timeSince(Date.parse(updated_at)) + " ago."}
            </p>
          </div>
        ) : (
          <div>
            <img src={image} alt="" />
            <div>
              {!tags
                ? null
                : tags.map(tag => <span className="tag">{tag}</span>)}
            </div>
            <p className="title">{title}</p>
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
