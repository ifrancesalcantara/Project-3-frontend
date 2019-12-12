import React, { Component } from "react";
import { Link } from "react-router-dom";
import shortid from "shortid";
import "./ListPainting.css";

export default class PaintingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paintings: props.paintings
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="painting-list-div">
        {this.state.paintings.map((painting, i) => {
          return (
            <div key={shortid.generate()} className="painting-list-item">
              <Link to={`/painting/${painting._id}`}>
                <img src={painting.image} alt="" className="" />
              </Link>

              <div className="img-info">
                <p>{painting.title}</p>
                <p>1</p>
                {/* <Link to={`/chat/${painting.creator}`}>
                          <img src={this.state.userProfilePics[painting.creatorUsername]} alt=""/> 
                          <p>{painting.creatorUsername}</p>
                      </Link> */}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
