import React, { Component } from "react";

export default class LoadingGif extends Component {
  render() {
    const { view, className } = this.props;
    const src =
      "https://retchhh.files.wordpress.com/2015/03/loading1.gif?w=300&h=300";
    return (
      <span>
        {view === "signup" ? (
          <img src={src} className={className} alt="" />
        ) : (
          <img src={src} alt="" />
        )}
      </span>
    );
  }
}
