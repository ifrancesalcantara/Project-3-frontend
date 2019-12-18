import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import { Link } from "react-router-dom";
import "./DetailsPainting.css";
import paintingService from "../../lib/services/painting-service";
import userService from "./../../lib/services/user-services";
import Tag from "./../AddPainting/Tag";
import shortid from "shortid";
import LoadingGif from "../LoadingGif";
import Image from "./../Image";

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
      console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<", imgData);
      this.setState({ paintingDetails: imgData });
    }, 50);
  };

  //!!! TAKE OUT (ALSO CHATS)
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
      created_at,
      game
    } = this.state.paintingDetails;
    const paintingId = this.state.paintingDetails._id;

    return (
      <div className="details-div">
        {!this.state.paintingDetails ? null : this.state.paintingDetails ===
          "Request failed with status code 404" ? (
            <div className="error-404">
              <img
                src="https://cdn.dribbble.com/users/2112205/screenshots/6311420/404.gif"
                alt=""
              />
            <h1>Oh, no!</h1>
            <h1> We were not able to find that painting</h1>
            <p>It may have been deleted...</p>
            </div>
        ) : isLoggedIn ? (
          <div>
            <Image src={image} view="display" className="edit-main-img" />
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
                <span className="details-game">
                  <Link to={`/?game=${game}`}>{game}</Link>
                </span>
              </div>
            </div>
            {!user ? null : user._id === creator ? (
              <div className="details-title-wrapper">
                <p className="details-title">{title}</p>
                <span>
                  <Link to={`/painting/edit/${this.state.paintingDetails._id}`}>
                    <img
                      src="https://img.icons8.com/dusk/512/000000/edit.png"
                      alt=""
                    />
                  </Link>
                </span>
              </div>
            ) : (
              <div className="details-title-wrapper">
                <p className="details-title">{title}</p>
              </div>
            )}
            {!description ? null : (
              <p className="details-description">{description}</p>
            )}
            <div className="details-tags-wrapper">
              {!tags
                ? null
                : tags.map(tag => (
                    <Link key={shortid.generate()} to={`/?tag=${tag}`}>
                      <Tag text={tag}></Tag>
                    </Link>
                  ))}
            </div>
            <div className="detail-creator-info-div">
              <p>
                By: <Link to={`/profile/${creator}`}>{creatorUsername}</Link>
              </p>

              {!user ? null : user._id !== creator ? (
                <Link to={`/chat/${creator}/${user._id}`}>
                  <img
                    src="https://img.icons8.com/plasticine/100/000000/chat.png"
                    alt=""
                  />
                </Link>
              ) : null}
            </div>

            <div className="creation-date">
              <p>Created {this.timeSince(Date.parse(created_at)) + " ago."}</p>
            </div>
          </div>
        ) : (
          <div>
            <Image src={image} view="display" className="edit-main-img" />

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
                <span style={{ marginBottom: 0 }}>
                  {usersWhoLiked ? (
                    <div>
                      <Link to="/login">
                        <img
                          src="https://img.icons8.com/ios/50/000000/christmas-star.png"
                          alt=""
                        />
                      </Link>
                      <span>{usersWhoLiked.length}</span>
                    </div>
                  ) : (
                    <LoadingGif />
                  )}
                </span>
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
                      alt={paintingId}
                    />
                    <span id="likes-qty">{usersWhoLiked.length}</span>
                  </div>
                )}
                <span className="details-game">
                  <Link to={`/?game=${game}`}>{game}</Link>
                </span>
              </div>
            </div>

            <div className="details-title-wrapper">
              <p className="details-title">{title}</p>
            </div>
            {!description ? null : (
              <p className="details-description">{description}</p>
            )}
            <div className="details-tags-wrapper">
              {!tags
                ? null
                : tags.map(tag => (
                    <Link key={shortid.generate()} to={`/?tag=${tag}`}>
                      <Tag text={tag}></Tag>
                    </Link>
                  ))}
            </div>
            <div className="detail-creator-info-div">
              <p>
                By: <Link to={`/profile/${creator}`}>{creatorUsername}</Link>
              </p>

              {!user ? null : user._id !== creator ? (
                <Link to={`/chat/${creator}/${user._id}`}>
                  <img
                    src="https://img.icons8.com/plasticine/100/000000/chat.png"
                    alt=""
                  />
                </Link>
              ) : null}
            </div>

            <div className="creation-date">
              <p>Created {this.timeSince(Date.parse(created_at)) + " ago."}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withAuth(PaintingDetails);
