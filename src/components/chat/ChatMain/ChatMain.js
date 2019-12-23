import React, { Component } from "react";
import shortid from "shortid";
import { geolocated } from "react-geolocated";
import "./ChatMain.css";

class ChatMain extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { user } = this.props;
    return (
      <div className="chat">
        {!this.props.chat
          ? null
          : !user
          ? null
          : this.props.chat.a.comments.map(comment => {
              return (
                <div key={shortid.generate()}>
                      
                  {comment.creatorId === user._id ? (
                    <div
                      className="my-chat-comment-wrapper"
                    >
                      <div className="talktext">
                        <p className="my-chat-comment">{comment.commentText}</p>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={shortid.generate()}
                      className="other-chat-comment-wrapper"
                    >
                      <div className="talktext">
                        <p className="other-user-chat-comment">
                          {comment.commentText}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
      </div>
    );
  }
}

export default geolocated({
  positionOptions: {
      enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(ChatMain);