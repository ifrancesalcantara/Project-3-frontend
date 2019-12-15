import React from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";
import "./Navbar.css";

class Navbar extends React.Component {
  state = {
    profilePic: ""
  };

  render() {
    const { user, logout, isLoggedIn } = this.props;
    return (
      <div className="navbar">
        {isLoggedIn ? (
          <ul>
            {this.props.view === "home" ? (
              <li></li>
            ) : (
              <li>
                <img
                  onClick={() => this.props.history.goBack()}
                  src="https://img.icons8.com/metro/52/000000/back.png"
                  alt=""
                />
              </li>
            )}
            {this.props.view === "home" ? (
              <li style={{ listStyleType: "none" }}>
                <Link to="/">
                  <h1 onClick={this.props.getHomePaintings}>Maquetepinto</h1>
                </Link>
              </li>
            ) : (
              <li style={{ listStyleType: "none" }}>
                <Link to="/">Maquetepinto</Link>
              </li>
            )}

            {/* <span className="vertical-hr" /> */}

            <li style={{ listStyleType: "none" }}>
              <Link to={`/profile/${user._id}`}>
                <img src={user.image} alt="" id="navbar-profile-img"/>
              </Link>
            </li>
          </ul>
        ) : (
          <ul>
            {this.props.view === "home" ? (
              <li></li>
            ) : (
              <li>
                <img
                  onClick={() => this.props.history.goBack()}
                  src="https://img.icons8.com/metro/52/000000/back.png"
                  alt=""
                />
              </li>
            )}
            <span className="empty-hr" />

            <li style={{ listStyleType: "none" }}>
              <Link to="/">Maquetepinto</Link>
            </li>
            <span className="vertical-hr" />
            <li style={{ listStyleType: "none" }}>
              <Link to="/login">Log In</Link>
            </li>
            <span className="vertical-hr" />
            <li style={{ listStyleType: "none" }}>
              <Link to="/signup">Sign up</Link>
            </li>
          </ul>
        )}
      </div>
    );
  }
}

export default withAuth(Navbar);
