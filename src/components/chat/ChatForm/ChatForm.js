import React, { Component } from "react";
import "./ChatForm.css"

export default class ChatMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newComment: {
        creatorUsername: this.props.user.username, // this.props.user.username,
        creatorId: this.props.user._id, //this.props.user._id,
        commentText: "",
        commentImage: ""
      }
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    const newCommenCopy = { ...this.state.newComment };
    newCommenCopy[name] = value;
    this.setState({ newComment: newCommenCopy });
  };

  preventDefaultAndSendComment = e => {
    e.preventDefault();
    this.props.sendComment(this.state.newComment);
    const newCommenCopy = { ...this.state.newComment };
    newCommenCopy.commentText = "";
    this.setState({ newComment: newCommenCopy });
  };

  render() {
    return (
      <form onSubmit={e => this.preventDefaultAndSendComment(e)}
        className="chatform">
        <input
          type="text"
          name="commentText"
          onChange={this.handleChange}
          value={this.state.newComment.commentText}
        />
        <input type="submit" value="Send" className="yellowbutton chat-send-btn"/>
      </form>
    );
  }
}
