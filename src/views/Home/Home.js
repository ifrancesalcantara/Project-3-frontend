import React from "react";
import "./Home.css";

import Navbar from "../../components/Navbar/Navbar";
import ExploreBar from "../../components/ExploreBar/ExploreBar";
import PaintingList from "../../components/ListPainting/ListPainting";
import { Link } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";
import paintingService from "../../lib/services/painting-service";
import userService from "./../../lib/services/user-services";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      paintings: null
    };
  }

  getHomePaintings = async () => {
    const homePaintings = await paintingService.getHomePaintings();
    this.setState({ paintings: homePaintings });
  };

  getFilteredPaintings = async filter => {
    let filteredPaintings;
    if(filter){
      filteredPaintings = await paintingService.getFilteredPaintings(
        filter
      );
    }
    else if (this.props.location.search) {
      filteredPaintings = await paintingService.getFilteredPaintings(
        this.props.location.search
      );
    }

    if (filteredPaintings) {
      this.setState({ paintings: filteredPaintings.data });
    }
  };

  componentDidMount = () => {
    const queryObj = this.props.location.search;
    if (Object.keys(queryObj).length === 0) this.getHomePaintings();
    else this.getFilteredPaintings(queryObj.sort);
  };

  handleLike =(string)=>{
    userService.handleLike(string)
  }



  render() {
    const { user, isLoggedIn } = this.props;
    return (
      <div>

        <Navbar view="home" getHomePaintings={this.getHomePaintings} />
        <ExploreBar
          {...this.props}
          getSortedPaintings={this.getSortedPaintings}
          getFilteredPaintings={this.getFilteredPaintings}
        />

        {!this.state.paintings ? null : (
          <PaintingList user={user} paintings={this.state.paintings} 
          handleLike={this.handleLike}/>
        )}

        {isLoggedIn ? (
          <div>
            
          <Link to={`/chats/${user._id}`} className="chats-link">
          <img src="https://img.icons8.com/flat_round/64/000000/speech-bubble.png" alt=""/>
          </Link>
          <Link to="/paintings/add" className="add-link">
            <img
              src="https://img.icons8.com/material/96/000000/add.png"
              alt=""
            />
          </Link>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withAuth(Home);
