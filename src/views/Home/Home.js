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
      paintings: null,
      lastSearch: null,
      displayedPaintings: null
    };
  }

  //!!!DELETE BACKEND / part
  sortPaintings = async sort => {
    if(sort===this.state.lastSearch) { return }
    let sortedPaintings;

    if(sort ==="Newest") {
      sortedPaintings = this.state.paintings.sort((a,b)=>{
        if(a.created_at>b.created_at){
          return -1
        } else {
          return 1
        }
      })

    } else if(sort ==="Oldest") {
      sortedPaintings = this.state.paintings.sort((a,b)=>{
        if(a.created_at>b.created_at){
          return 1
        } else {
          return -1
        }
      })

    } else if(sort ==="Most liked") {
      sortedPaintings = this.state.paintings.sort((a,b)=>{
        if(a.usersWhoLiked.length>b.usersWhoLiked.length){
          return -1
        } else {
          return 1
        }
      })

    } else if(sort ==="Most seen") {
      sortedPaintings = this.state.paintings.sort((a,b)=>{
        if(a.timesSeen>b.timesSeen){
          return -1
        } else {
          return 1
        }
      })
    }

    this.setState({displayedPaintings: sortedPaintings, lastSearch: sort})
  };

  filterPaintings=(filter)=>{
    this.setState({displayedPaintings: this.state.paintings.filter(painting=>{
      return painting.title.includes(filter)
    })})
  }

  componentDidMount = async () => {
    const homePaintings = await paintingService.getHomePaintings();
    this.setState({ paintings: homePaintings, displayedPaintings: homePaintings })
  }

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
          sortPaintings={this.sortPaintings}
          filterPaintings={this.filterPaintings}
        />

        {!this.state.paintings ? null : (
          <PaintingList user={user} paintings={this.state.displayedPaintings} 
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
