import React, { Component } from "react";
import shortid from "shortid";
import "./ChatMain.css";

export default class ChatMain extends Component {
  render() {
    return (
      <div className="chat">
        {this.props.chat
          ? this.props.chat.a.comments.map(comment => {
              return (
                <div key={shortid.generate()}>
                  <p>{comment.commentText}</p>
                </div>
              );
            })
          : null}
      </div>
    );
  }
}
