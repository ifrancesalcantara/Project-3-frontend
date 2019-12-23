import React, { Component } from "react";
import { Link } from "react-router-dom";
import userService from "./../../lib/services/user-services";
import shortid from "shortid";

import "./ListPainting.css";

import LoadingGif from "./../LoadingGif";
import paintingService from "./../../lib/services/painting-service";
import Image from "./../Image";

const emptyStar = "https://img.icons8.com/ios/50/000000/christmas-star.png";
const filledStar = "https://img.icons8.com/color/100/000000/filled-star.png";

export default class PaintingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paintings: props.paintings
    };
  }

  componentDidMount = async () => {
    const navbarTitle = document.querySelector("#navbar-title");
    if (navbarTitle) {
      document
        .querySelector("#navbar-title")
        .addEventListener("click", async () => {
          this.setState({
            paintings: await paintingService.getHomePaintings()
          });
        });
    }
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ paintings: nextProps.paintings });
  }

  handleLikeAndToggleImageSource = e => {
    let image = e.target.src;
    if (image === emptyStar) {
      e.target.setAttribute("src", filledStar);
      e.target.classList.remove("emptyStar");
      e.target.classList.add("filledStar");
      const { user } = this.props;
      const paintingId = e.target.alt;
      this.props.handleLike(`/handle-like/like/${user._id}/${paintingId}`);
    } else {
      e.target.setAttribute("src", emptyStar);
      e.target.classList.remove("filledStar");
      e.target.classList.add("emptyStar");
      const { user } = this.props;
      const paintingId = e.target.alt;
      this.props.handleLike(`/handle-like/unlike/${user._id}/${paintingId}`);
    }
  };

  addSeen(id) {
    userService.addSeen(id);
  }

  render() {
    return (
      <div className="painting-list-div">
        {!this.state.paintings ? (
          <LoadingGif />
        ) : !this.state.paintings.length ? <h2 className="search-err">No matching paintings</h2> : (
          this.state.paintings.map((painting, i) => {
            return (
              <div key={shortid.generate()} className="painting-list-item">
                {!this.props.user ? null : !painting.usersWhoLiked.includes(
                    this.props.user._id
                  ) ? (
                  <img
                    onClick={this.handleLikeAndToggleImageSource}
                    className="emptyStar"
                    src={emptyStar}
                    alt={painting._id}
                  />
                ) : (
                  <img
                    className="filledStar"
                    onClick={this.handleLikeAndToggleImageSource}
                    src={filledStar}
                    alt={painting._id}
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
