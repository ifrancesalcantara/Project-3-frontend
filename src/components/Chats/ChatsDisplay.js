import shortid from "shortid";
import React, { Component } from "react";
import { Link } from "react-router-dom";

import userService from "./../../lib/services/user-services";
import { timeSince } from "./../../lib/config/functions"

import LoadingGif from "./../LoadingGif";

import "./ChatsDisplay.css";

export default class ChatsDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: null
    };
  }

  componentDidMount = async () => {
    const userId = this.props.match.params.userId;
    const chats = await userService.getUserChatRooms(userId);
    this.setState({ chats: chats });
    chats.forEach(async (chat, i) => {
      const otherUserId = this.getOtherUser(chat.roomId, userId);
      if (otherUserId.split("").length === userId.split("").length) {
        const otherUserData = await userService.getUser(otherUserId);
        this.setState({
          [otherUserData._id]: {
            image: otherUserData.image,
            username: otherUserData.username
          }
        });
      } else {
        chats.splice(i, 1);
      }
    });
  };

  //!!! KEEP BOT IDS IT IN CHAT MODEL
  getOtherUser(roomId, userId) {
    let result = roomId.split(userId).join("");
    // console.log("I am ", userId, " so the result is ", result);
    if (result.length === userId.length) {
      return result;
    } else {
      return result.split(userId).join("");
    }
  }

  ///!!! FIX THIS. SHOULD NOT BE NEEDED
  IMessedUp(roomId, userId) {
    var regExp = new RegExp(userId, "g");
    console.log(roomId)
    if ((roomId.match(regExp) || []).length > 1) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    const { chats } = this.state;
    const userId = this.props.match.params.userId;
    return (
      <div>
        <h1 style={{ margin: "4vh 0" }}>Your chats</h1>
        {!chats ? (
          <LoadingGif />
        ) : !chats.length ? (
          <h2>You have no active chats...</h2>
        ) : (
          chats.map(chat => {
            return (
              <span key={shortid.generate()}>
                {!this.IMessedUp(chat.roomId, userId) ? "a" : (
                  <div>
                    <div className="chats-chat-item">
                      {!this.state[
                        this.getOtherUser(chat.roomId, userId)
                      ] ? null : (
                        <Link
                          to={`/profile/${this.getOtherUser(
                            chat.roomId,
                            userId
                          )}`}
                        >
                          <img
                            src={
                              this.state[this.getOtherUser(chat.roomId, userId)]
                                .image
                            }
                            alt=""
                            className="chats-user-img"
                          />
                          <p id="chats-chat-username">
                            {
                              this.state[this.getOtherUser(chat.roomId, userId)]
                                .username
                            }
                          </p>
                        </Link>
                      )}
                      <div className="chats-info-div">
                        <Link
                          to={`/chat/${userId}/${this.getOtherUser(
                            chat.roomId,
                            userId
                          )}`}
                          style={{ color: "black" }}
                        >
                          <p className="chats-comment-title">Last message:</p>
                          <div>
                            {!chat.comments.length ? (
                              <p>Write your first comment!</p>
                            ) : (
                              <div className="chats-last-msg-and-time">
                                <p className="chats-comment-text">
                                  {
                                    chat.comments[chat.comments.length - 1]
                                      .commentText
                                  }
                                </p>
                              </div>
                            )}
                            {!chat.comments[chat.comments.length - 1] ? null : (
                              <p className="chats-time-ago">
                                {timeSince(
                                  Date.parse(
                                    chat.comments[chat.comments.length - 1]
                                      .created_at
                                  )
                                )}
                              </p>
                            )}
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </span>
            );
          })
        )}
      </div>
    );
  }
}
