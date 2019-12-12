import React from "react";

import Navbar from "../components/Navbar/Navbar";
import ProfileDisplay from "../components/ProfileDisplay/ProfileDisplay";
import { withAuth } from "../lib/AuthProvider";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { user, logout } = this.props;
    return (
      <div>
        <Navbar />
        {user ? <ProfileDisplay user={user._id} logout={logout} /> : null}
      </div>
    );
  }
}

export default withAuth(Home);
