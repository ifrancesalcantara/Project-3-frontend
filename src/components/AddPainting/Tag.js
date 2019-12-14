import React, { Component } from "react";

export default class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      className: "hidden"
    };
  }

  changeClassName = () => {
    if (this.state.className === "hidden")
      this.setState({ className: "add-tag-delete-img" });
    else {
      this.setState({ className: "hidden" });
    }
  };

  render() {
    return (
      <div style={{ display: "inline" }}>
        {this.props.view === "add-form" ? (
          <span
            onMouseOut={this.changeClassName}
            onMouseOver={this.changeClassName}
            className="add-displayed-tag"
          >
            {this.props.text}
            <img
              onClick={this.props.deleteTag}
              className={this.state.className}
              src="https://www.pngix.com/pngfile/big/90-905356_close-svg-png-icon-free-download-icone-x.png"
              alt=""
            />
          </span>
        ) : (
          <span className="add-displayed-tag">{this.props.text}</span>
        )}
      </div>
    );
  }
}
