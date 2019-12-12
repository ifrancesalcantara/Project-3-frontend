import React from "react";
import axios from "axios";
import "./Home.css";

import Navbar from "../../components/Navbar/Navbar";
import PaintingList from "../../components/ListPainting/ListPainting";
import { Link } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  getHomePaintings = () => {
    axios
      .get("http://localhost:5000/paintings/home")
      .then(response => {
        this.setState({ paintings: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getHomePaintings();
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        <Navbar view="home"/>

        {!this.state.paintings ? null : (
          <PaintingList paintings={this.state.paintings} />
        )}

        {isLoggedIn ? (
          <Link to="/paintings/add" className="add-link">
            <img
              src="https://img.icons8.com/material/96/000000/add.png"
              alt=""
            />
          </Link>
        ) : null}
      </div>
    );
  }
}

export default withAuth(Home);
