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

  componentDidMount = async () => {
    const userData = await userService.getUser(this.props.user);
    this.setState({ user: userData });
  };

  deleteMe = paintingId => {
    paintingService.delete(paintingId);
    setTimeout(async () => {
      const userData = await userService.getUser(this.props.user);
      this.setState({ user: userData });
    }, 300);
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
                <ul className="profile-paintings-wrapper">
                  {this.state.user.paintings.map(painting => (
                    <div key={shortid.generate()} className="profile-painting">
                      <Link to={`/painting/${painting._id}`}>
                        <img
                          src={painting.image}
                          alt=""
                        />
                      </Link>
                      <div>
                        <Link to={`/painting/${painting._id}`}>
                          <p>{painting.title}</p>
                        </Link>
                        <div>
                          <button
                            onClick={() => {
                              this.deleteMe(painting._id);
                            }}
                          >
                            DELETE
                          </button>
                          <span>
                            <Link to={`/painting/edit/${painting._id}`}>
                              Edit
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
