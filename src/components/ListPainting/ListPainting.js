import React, { Component } from "react";
import { Link } from "react-router-dom";
import userService from "./../../lib/services/user-services";
import shortid from "shortid";
import "./ListPainting.css";

export default class PaintingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paintings: props.paintings
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ paintings: nextProps.paintings });
  }

  handleLikeAndToggleImageSource = e => {
    let image = e.target.src;
    const emptyStar = "https://img.icons8.com/ios/50/000000/christmas-star.png";
    const filledStar =
      "https://img.icons8.com/color/100/000000/filled-star.png";
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

  addSeen(id){
    userService.addSeen(id)
  }

  render() {
    let starImage;
    if (this.props.user) {
      console.log(this.props.user._id);
    }
    return (
      <div className="painting-list-div">
        {this.state.paintings.map((painting, i) => {
          return (
            <div key={shortid.generate()} className="painting-list-item">
              {!this.props.user ? null : painting.usersWhoLiked.indexOf(
                  this.props.user._id
                ) ? (
                <img
                  onClick={this.handleLikeAndToggleImageSource}
                  className="emptyStar"
                  src="https://img.icons8.com/ios/50/000000/christmas-star.png"
                  alt={painting._id}
                />
              ) : (
                <img
                  className="filledStar"
                  onClick={this.handleLikeAndToggleImageSource}
                  src="https://img.icons8.com/color/100/000000/filled-star.png"
                  alt={painting._id}
                />
              )}

              <Link onClick={()=>this.addSeen(painting._id)} to={`/painting/${painting._id}`}>
                <img src={painting.image} alt="" className="" />
              </Link>

              <div className="img-info">
                <Link onClick={()=>this.addSeen(painting._id)} to={`/painting/${painting._id}`}>
                  <p className="list-title">{painting.title}</p>
                </Link>
                {/* <Link to={`/chat/${painting.creator}`}>
                          <img src={this.state.userProfilePics[painting.creatorUsername]} alt=""/> 
                          <p>{painting.creatorUsername}</p>
                      </Link> */}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
