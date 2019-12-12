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
              <Link to={`/painting/${painting._id}`}>
                <p className="list-title">{painting.title}</p>
              </Link>
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
