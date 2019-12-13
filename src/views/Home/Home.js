import React from "react";
import axios from "axios";
import queryString from "query-string";
import "./Home.css";

import Navbar from "../../components/Navbar/Navbar";
import PaintingList from "../../components/ListPainting/ListPainting";
import { Link } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";
import paintingService from "../../lib/services/painting-service";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  getHomePaintings = async () => {
    const homePaintings = await paintingService.getHomePaintings();
    console.log(homePaintings)
    this.setState({ paintings: homePaintings });
  };

  getFilteredPaintings = (filter) => {
    paintingService.getFilteredPaintings(this.props.location.search)
  };

  componentDidMount = () => {
    const filter = queryString.parse(this.props.location.search);
    console.log(Object.keys(filter).length)
    if (Object.keys(filter).length===0) this.getHomePaintings();
    else this.getFilteredPaintings(filter);
  };

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        <Navbar view="home" />

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
