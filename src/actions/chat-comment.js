import * as CommentActionTypes from "../actiontypes/chat-comment";

export const changeCommentText = commentText =>{
    return{
        type: CommentActionTypes.CHANGE_COMMENT_TEXT,
        commentText
    }
}

export const changeCommentImage = commentImage =>{
    return{
        type: CommentActionTypes.CHANGE_COMMENT_IMAGE,
        commentImage
    }
}