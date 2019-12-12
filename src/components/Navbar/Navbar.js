import React from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";
import "./Navbar.css";

class Navbar extends React.Component {
  state = {
    profilePic: ""
  };

  componentDidMount() {}

  render() {
    const { user, logout, isLoggedIn } = this.props;
    return (
      <div className="navbar">
        {isLoggedIn ? (
          <ul>
            <span className="empy-hr" />

            <li style={{ listStyleType: "none" }}>
              <Link to="/">Home</Link>
            </li>
            <span className="vertical-hr" />

            <li style={{ listStyleType: "none" }}>
              <Link to="/profile">Profile</Link>
            </li>
            <span className="vertical-hr" />

            <li>
              <img src={user.image} alt="" />
            </li>
          </ul>
        ) : (
          <ul>
            <span className="empy-hr" />

            <li style={{ listStyleType: "none" }}>
              <Link to="/">Home</Link>
            </li>
            <span className="vertical-hr" />
            <li style={{ listStyleType: "none" }}>
              <Link to="/profile">Profile</Link>
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
