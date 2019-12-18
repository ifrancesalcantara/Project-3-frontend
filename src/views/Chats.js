import React, { Component } from "react";

import Navbar from "../components/Navbar/Navbar";
import paintingService from "../lib/services/painting-service";
import { withAuth } from "../lib/AuthProvider";
import ChatsDisplay from "../components/Chats/ChatsDisplay"


class Painting extends Component {
  constructor(props) {
    super(props);
    this.state = {
        paintingDetails: null,
        newPainting: null
    };
  }


  componentDidMount=async()=>{
      const { paintingId } = this.props.match.params 
      const imgData = await paintingService.getDetails(paintingId);
      this.setState({ paintingDetails: imgData, newPainting: imgData });
  }

  render() {
    const { user } = this.props
    return (
      <div>
        <Navbar  {...this.props}/>
        <ChatsDisplay {...this.props} user={user}/>
      </div>
    );
  }
}

export default withAuth(Painting);
