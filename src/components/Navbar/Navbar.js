import React from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";
import "./Navbar.css";

class Navbar extends React.Component {
  state = {
    profilePic: ""
  };

  render() {
    const { user, isLoggedIn, view } = this.props;
    return (
      <div className="navbar">
        <ul>
          {view === "home" ? (
            <li style={{ listStyleType: "none" }}>
              <Link to="/" className="navbar-link">
                <h1 onClick={this.props.getHomePaintings}>Paintapop</h1>
              </Link>
            </li>
          ) : (
            <li>
              <img
                onClick={() => this.props.history.goBack()}
                src="https://img.icons8.com/metro/52/000000/back.png"
                alt=""
              />
            </li>
          )}

          {view === "home" ? (
            <li></li>
          ) : (
            <li style={{ listStyleType: "none" }}>
              <Link to="/" className="navbar-link">
                Paintapop
              </Link>
            </li>
          )}

          {isLoggedIn ? (
            <li style={{ listStyleType: "none" }}>
              <Link to={`/profile/${user._id}`} className="navbar-link">
                <img src={user.image} alt="" id="navbar-profile-img" />
              </Link>
            </li>
          ) : (
            <li style={{ listStyleType: "none" }}>
              <Link to="/login" className="navbar-link">
                Log In
              </Link>
            </li>
          )}
          {!isLoggedIn ? (
            <li style={{ listStyleType: "none" }}>
              <Link to="/signup" className="navbar-link">
                Sign up
              </Link>
            </li>
          ) : null}
        </ul>
      </div>
    );
  }
}

export default withAuth(Navbar);
