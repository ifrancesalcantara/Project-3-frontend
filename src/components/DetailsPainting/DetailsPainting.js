import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import { Link } from "react-router-dom";
import "./DetailsPainting.css";
import paintingService from "../../lib/services/painting-service";
import userService from "./../../lib/services/user-services";
import ReactImageMagnify from "react-image-magnify";
import Tag from "./../AddPainting/Tag";
import shortid from "shortid";

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
    setTimeout(async () => {
      const imgData = await paintingService.getDetails(this.state.paintingId);
      this.setState({ paintingDetails: imgData });
    }, 50);
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

  handleLikeAndToggleImageSource = e => {
    let image = e.target.src;
    const emptyStar = "https://img.icons8.com/ios/50/000000/christmas-star.png";
    const filledStar =
      "https://img.icons8.com/color/100/000000/filled-star.png";
    if (image === emptyStar) {
      e.target.setAttribute("src", filledStar);
      e.target.classList.remove("details-emptyStar");
      e.target.classList.add("details-filledStar");
      const { user } = this.props;
      const paintingId = e.target.alt;
      userService.handleLike(`/handle-like/like/${user._id}/${paintingId}`);
      document.querySelector("#likes-qty").innerHTML =
        parseInt(document.querySelector("#likes-qty").innerHTML) + 1;
    } else {
      e.target.setAttribute("src", emptyStar);
      e.target.classList.remove("details-filledStar");
      e.target.classList.add("details-emptyStar");
      const { user } = this.props;
      const paintingId = e.target.alt;
      userService.handleLike(`/handle-like/unlike/${user._id}/${paintingId}`);
      document.querySelector("#likes-qty").innerHTML =
        parseInt(document.querySelector("#likes-qty").innerHTML) - 1;
    }
  };

  render() {
    const { user, isLoggedIn } = this.props;
    const {
      image,
      title,
      description,
      creator,
      creatorUsername,
      timesSeen,
      usersWhoLiked,
      tags,
      updated_at,
      game
    } = this.state.paintingDetails;
    const paintingId = this.state.paintingDetails._id;
    console.log("timesSeen", timesSeen);
    if (usersWhoLiked && user) {
      console.log(
        "LIKED BY: ",
        usersWhoLiked,
        " THEREFORE: ",
        usersWhoLiked.includes(user._id)
      );
    }
    return (
      <div className="details-div">
        {!this.state.paintingDetails ? null : isLoggedIn ? (
          <div>
            <img className="edit-main-img" src={image} alt="" />
            {/* <ReactImageMagnify //!!!
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
            </a> */}
            <div>
              <div className="details-view-info">
                <div>
                  <img
                    className="edit-seenTimes"
                    src="https://img.icons8.com/material-rounded/96/000000/visible.png"
                    alt=""
                  />
                  <span>{timesSeen}</span>
                </div>
                {!this.props
                  .user ? null : !usersWhoLiked ? null : usersWhoLiked.includes(
                    user._id
                  ) ? (
                  <div>
                    <img
                      className="details-filledStar"
                      onClick={this.handleLikeAndToggleImageSource}
                      src="https://img.icons8.com/color/100/000000/filled-star.png"
                      alt={paintingId} //!!! CUSTOM ID OR OTHER WAY TO PASS IT. Data-NOT WORKING
                    />
                    <span id="likes-qty">{usersWhoLiked.length}</span>
                  </div>
                ) : (
                  <div>
                    <img
                      onClick={this.handleLikeAndToggleImageSource}
                      className="details-emptyStar"
                      src="https://img.icons8.com/ios/50/000000/christmas-star.png"
                      alt={paintingId} //!!! CUSTOM ID OR OTHER WAY TO PASS IT. Data-NOT WORKING
                    />
                    <span id="likes-qty">{usersWhoLiked.length}</span>
                  </div>
                )}
              </div>
            </div>
            <p className="details-title">{title}</p>
            <p>{description}</p>
            {!user ? null : user._id !== creator ? (
              <Link to={`/chat/${creator}/${user._id}`}>
                START A CHAT with {creator}
              </Link>
            ) : null}
            <p>By: {creatorUsername}</p>
            <div>
              {!tags
                ? null
                : tags.map(tag => (
                    <Link key={shortid.generate()} to={`/?tag=${tag}`}>
                      <Tag text={tag}></Tag>
                    </Link>
                  ))}
            </div>
            <Link to={`/?game=${game}`}>{game}</Link>
            {!user ? null : user._id === creator ? (
              <span>
                <Link to={`/painting/edit/${this.state.paintingDetails._id}`}>
                  Edit
                </Link>
              </span>
            ) : null}

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
                : tags.map(tag => (
                    <span key={shortid.generate()} className="tag">
                      {tag}
                    </span>
                  ))}
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
