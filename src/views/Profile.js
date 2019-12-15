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
        <Navbar {...this.props} refresh={this.refresh}/>
        {user ? <ProfileDisplay user={user._id} logout={logout} {...this.props}/> : null}
      </div>
    );
  }
}

export default withAuth(Home);
