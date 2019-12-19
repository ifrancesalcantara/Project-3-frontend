import React, { Component } from "react";
import { Link } from "react-router-dom";
import shortid from "shortid";
import "./ProfileDisplay.css";
import userService from "./../../lib/services/user-services";
import paintingService from "../../lib/services/painting-service";
import LoadingGif from "./../LoadingGif"
import Image from "./../Image"

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
    if(document
      .querySelector("#navbar-profile-img")){
        document
          .querySelector("#navbar-profile-img")
          .addEventListener("click", () => this.refreshProfile());
      }
  };

  refreshProfile = async () => {
    setTimeout(async () => {
      const userData = await userService.getUser(
        this.props.match.params.userId
      );
      this.setState({ user: userData });
    }, 50);
  };

  deleteMe = paintingId => {
    paintingService.delete(paintingId);
    setTimeout(async () => {
      const userData = await userService.getUser(this.props.user._id);
      this.setState({ user: userData });
    }, 50);
  };

  LogoutAndGoToSignup = ()=> {
    this.props.logout()
    // .then(()=>{
    //   this.props.history.push("/signup")
    // })
  }

  render() {
    return (
      <div>
        {!this.state.user ? <LoadingGif/> : (
          <div key={shortid.generate()} className="profile-info">
            {!this.props.user ? null : (
              <span>
                {this.props.user._id !== this.state.user._id ? null : (
                  <button className="redbutton logout-button" onClick={this.LogoutAndGoToSignup}>
                    LOGOUT
                  </button>
                )}
              </span>
            )}

            {!this.state.user.paintings ? <h1>{this.state.user.username} has no style cards</h1> : !this.state.user
                .paintings[0] ? <h1 className="profile-empty-err">You don't have any painting yet :(</h1> : (
              <div>
                {!this.props.user ? <h1 id="details-title-not-user">{this.state.user.username}'s paintings</h1> : this.props.user._id !== this.state.user._id ? (
                  <h1>{this.state.user.username}'s style cards</h1>
                ) : (
                  <h1>Your paintings</h1>
                )}

                <ul className="profile-paintings-wrapper">
                  {this.state.user.paintings.map(painting => (
                    <div key={shortid.generate()} className="profile-painting">
                      <Link to={`/painting/${painting._id}`}>
                      <Image src={painting.image} view="profile"/>
                      </Link>
                      <div>
                        {!this.props.user? <Link to={`/painting/${painting._id}`}>
                          <p className="other-profile-painting-title">
                            {painting.title}
                          </p>
                        </Link> :this.props.user._id !== this.state.user._id ? 
                          <Link to={`/painting/${painting._id}`}>
                          <p className="other-profile-painting-title">
                            {painting.title}
                          </p>
                        </Link> : (
                          <Link to={`/painting/${painting._id}`}>
                          <p className="my-profile-painting-title">
                            {painting.title}
                          </p>
                        </Link>
                        )}
                        
                        <p>{painting.description}</p>
                        <div>
                          {!this.props.user? null
                          :
                          this.props.user._id !==
                          this.state.user._id ? null : (
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
                          )}
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
