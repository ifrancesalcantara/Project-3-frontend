import React, { Component } from "react";
import shortid from "shortid";

export default class ChatMain extends Component {
  render() {
    return (
      <div key={shortid.generate()}>
        {this.props.chat
          ? this.props.chat.a.comments.map(comment => {
              return (
                <div>
                  <p>{comment.commentText}</p>
                </div>
              );
            })
          : null}
      </div>
    );
  }
}
