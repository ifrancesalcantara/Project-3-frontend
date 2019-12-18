import * as CommentActionTypes from "../actiontypes/chat-comment";

const initialState = {
  creatorUsername: "", // this.props.user.username,
  creatorId: "", //this.props.user._id,
  commentText: "",
  commentImage: ""
};

export default function Comment(state = initialState, action) {
  switch (action.type) {
    case CommentActionTypes.CHANGE_COMMENT_TEXT:
      return {
        ...state,
        commentText: action.commentText
      };
    case CommentActionTypes.CHANGE_COMMENT_IMAGE:
      return {
        ...initialState,
        commentImage: action.commentImage
      };
    case CommentActionTypes.SEND_COMMENT:
      return "a"
    //   {
    //     ...initialState,
    //     commentImage: action.commentImage
    //   };
    default:
  }
}
