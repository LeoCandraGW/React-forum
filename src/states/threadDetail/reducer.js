import { ActionType } from "./action";

function forumDetailReducer(forumDetail = null, action = {}) {
    switch (action.type) {
      case ActionType.RECEIVE_FORUM_DETAIL:
        return action.payload.forumDetail;
      case ActionType.CLEAR_FORUM_DETAIL:
        return null;
      case ActionType.UPVOTE_FORUM_COMMENT:
        return {
          ...forumDetail,
          comments: forumDetail.comments.map((comment) => {
            if (comment.id === action.payload.commentId) {
              return {
                ...comment,
                upvotes: comment.upvotes.includes(action.payload.userId)
                  ? comment.upvotes.filter((id) => id !== action.payload.userId)
                  : comment.upvotes.concat(action.payload.userId),
              };
            }
            return comment;
          }),
        };
      case ActionType.DOWNVOTE_FORUM_COMMENT:
        return {
          ...forumDetail,
          comments: forumDetail.comments.map((comment) => {
            if (comment.id === action.payload.commentId) {
              return {
                ...comment,
                downvotes: comment.downvotes.includes(action.payload.userId)
                  ? comment.downvotes.filter((id) => id !== action.payload.userId)
                  : comment.downvotes.concat(action.payload.userId),
              };
            }
            return comment;
          }),
        };
      default:
        return forumDetail;
    }
  }
  
  export default forumDetailReducer