import React, { Component } from "react";
import LoadingGif from "./LoadingGif";

export default class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps = () => {
    this.setState({});
  };
  render() {
    const { view, src, className } = this.props;
    console.log(this.props);
    console.log("src ", src);
    if (src) {
      console.log(
        src,
        " includes sketchfab.com?",
        src.includes("sketchfab.com")
      );
    }
    return (
      <span>
        {!src ? (
          <LoadingGif />
        ) : view === "display" ? (
          src.includes("sketchfab.com") ? (
            <div class="sketchfab-embed-wrapper">
              <iframe
                style={{ width: "200vw", margin: "0 0 2vh" }}
                title="A 3D model"
                width="640"
                height="480"
                src={src}
                frameborder="0"
                allow="autoplay; fullscreen; vr"
                mozallowfullscreen="true"
                webkitallowfullscreen="true"
              ></iframe>
            </div>
          ) : (
            <img className={className} src={src} alt="" />
          )
        ) : view === "home" ? (
          src.includes("sketchfab.com") ? (
            <div class="sketchfab-embed-wrapper"
            style={{ width: "100%", height: "22vh", paddingBottom:"0", marginBottom: "0" }}
            >
              <iframe
                style={{ width: "100%", height: "22vh", paddingBottom:"0", marginBottom: "0" }}
                title="A 3D model"
                width="640"
                height="480"
                src={src}
                frameborder="0"
                allow="autoplay; fullscreen; vr"
                mozallowfullscreen="true"
                webkitallowfullscreen="true"
              ></iframe>
            </div>
          ) : (
            <img className={className} src={src} alt="" />
          )
        ) : view === "profile" ? (
          src.includes("sketchfab.com") ? (
            <div class="sketchfab-embed-wrapper"
            style={{ width: "100%", height: "22vh",maxHeight: "20vh", paddingBottom:"0", marginBottom: "0" }}
            >
              <iframe
                style={{ width: "20vh", height: "22vh", maxHeight: "20vh", paddingBottom:"0", marginBottom: "0" }}
                title="A 3D model"
                width="640"
                height="480"
                src={src}
                frameborder="0"
                allow="autoplay; fullscreen; vr"
                mozallowfullscreen="true"
                webkitallowfullscreen="true"
              ></iframe>
            </div>
          ) : (
            <img className={className} src={src} alt="" />
          )
        ):
        null}
      </span>
    );
  }
}