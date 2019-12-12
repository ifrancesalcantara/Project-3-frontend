import React, { Component } from "react";
import { Link } from "react-router-dom";
import shortid from "shortid";
import "./ProfileDisplay.css";
import userService from "./../../lib/services/user-services";

export default class ProfileDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // userId: "",
      user: {}
    };
  }

  componentDidMount = async () => {
    const userData = await userService.getUser(this.props.user);
    this.setState({ user: userData });
  };

  render() {
    const { logout } = this.props;
    return (
      <div>
        {!this.state.user ? null : (
          <div key={shortid.generate()} className="profile-info">
            <button onClick={logout}>Logout</button>
            <h1>{this.state.user.username}</h1>

            {!this.state.user.paintings ? null : !this.state.user
                .paintings[0] ? null : (
              <div>
                <h2>Your paintings</h2>
                <ul>
                  {this.state.user.paintings.map(painting => (
                    <div key={shortid.generate()}>
                      <Link to={`/painting/${painting._id}`}>
                        <img
                          src={painting.image}
                          alt=""
                          className="painting-img"
                        />
                        <p>{painting.title}</p>
                      </Link>
                      {/* {painting.tags.map(tag => (
                        <span key={shortid.generate()}>#{tag} </span>
                      ))} */}
                      <Link to={`/painting/edit${painting._id}`}>Edit</Link>
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
