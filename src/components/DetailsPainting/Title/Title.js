import React, { Component } from "react";
import { Link } from "react-router-dom";

import { editIcon } from "./../../../lib/config/images";

export default class Title extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, id, ownPainting } = this.props;
    return (
      <div>
        {ownPainting ? (
          <div className="details-title-wrapper">
            <p className="details-title">{title}</p>
            <span>
              <Link to={`/painting/edit/${id}`}>
                <img src={editIcon} alt="" />
              </Link>
            </span>
          </div>
        ) : (
          <div className="details-title-wrapper">
            <p className="details-title">{title}</p>
          </div>
        )}
      </div>
    );
  }
}
