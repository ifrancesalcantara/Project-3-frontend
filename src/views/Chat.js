import React, { Component } from "react";

import { withAuth } from "../lib/AuthProvider";
import chatService from "../lib/services/chat-service";

import Navbar from "../components/Navbar/Navbar";
import ChatMain from "../components/chat/ChatMain/ChatMain";
import ChatForm from "../components/chat/ChatForm/ChatForm";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatData: null
    };
  }

  componentDidMount = async () => {
    this.setState({
      chatData: await chatService.getChatData(this.props.match.params)
    });
  };

  sendComment = async newComment => {
    const data = { ...this.props.match.params };
    data["newCommentData"] = newComment;
    const updatedChat = await chatService.postComment(data);
    const updatedChat2 = await chatService.getChatData(this.props.match.params);
    this.setState({ chatData: updatedChat2 });
  };

  render() {
    const {user} = this.props
    return (
      <div>
        <Navbar {...this.props}/>
        <ChatMain chat={this.state.chatData} user={user}></ChatMain>

        {user ? (
          <ChatForm
            sendComment={this.sendComment}
            user={user}
          ></ChatForm>
        ) : null}
      </div>
    );
  }
}

export default withAuth(Chat);
