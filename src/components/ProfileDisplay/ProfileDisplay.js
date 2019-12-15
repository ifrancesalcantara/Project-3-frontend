import React, { Component } from "react";
import { Link } from "react-router-dom";
import shortid from "shortid";
import "./ProfileDisplay.css";
import userService from "./../../lib/services/user-services";
import paintingService from "../../lib/services/painting-service";

export default class ProfileDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // userId: "",
      user: {}
    };
  }

  componentDidMount = () => {
    this.refreshProfile();
    document
      .querySelector("#navbar-profile-img")
      .addEventListener("click", () => this.refreshProfile());
  };

  refreshProfile =async () => {
    setTimeout(async()=>{
      const userData = await userService.getUser(this.props.match.params.userId);
      this.setState({ user: userData });
    }, 50)
  };

  deleteMe = paintingId => {
    paintingService.delete(paintingId);
    setTimeout(async () => {
      const userData = await userService.getUser(this.props.user._id);
      this.setState({ user: userData });
    }, 50);
  };

  render() {
    const { logout } = this.props;
    return (
      <div>
        <div></div>
        {!this.state.user ? null : (
          <div key={shortid.generate()} className="profile-info">
            <button className="redbutton" onClick={logout}>
              LOGOUT
            </button>
            <h1>{this.state.user.username}</h1>

            {!this.state.user.paintings ? null : !this.state.user
                .paintings[0] ? null : (
              <div>
                <h2>Your paintings</h2>
                <ul className="profile-paintings-wrapper">
                  {this.state.user.paintings.map(painting => (
                    <div key={shortid.generate()} className="profile-painting">
                      <Link to={`/painting/${painting._id}`}>
                        <img src={painting.image} alt="" />
                      </Link>
                      <div>
                        <Link to={`/painting/${painting._id}`}>
                          <p className="profile-painting-title">
                            {painting.title}
                          </p>
                        </Link>
                        <p>{painting.description}</p>
                        <div>
                          <button
                            className="redbutton"
                            onClick={() => {
                              this.deleteMe(painting._id);
                            }}
                          >
                            DELETE
                          </button>
                          <span>
                            <Link to={`/painting/edit/${painting._id}`}>
                              <button className="yellowbutton">EDIT</button>
                            </Link>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
