import { ActionType } from "./action";

function forumReducer(forums = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_FORUMS:
      return action.payload.forums;
    case ActionType.ADD_FORUM:
      return [action.payload.forum, ...forums];
      case ActionType.UPVOTE_FORUM:
        return forums.map((forum) => {
          if (forum.id === action.payload.forumId) {
            return {
              ...forum,
              upvotes: Array.isArray(forum.upvotes)
                ? forum.upvotes.includes(action.payload.userId)
                  ? forum.upvotes.filter((id) => id !== action.payload.userId)
                  : forum.upvotes.concat(action.payload.userId)
                : [action.payload.userId],
            };
          }
          return forum;
        });
      
      case ActionType.DOWNVOTE_FORUM:
        return forums.map((forum) => {
          if (forum.id === action.payload.forumId) {
            return {
              ...forum,
              downvotes: Array.isArray(forum.downvotes)
                ? forum.downvotes.includes(action.payload.userId)
                  ? forum.downvotes.filter((id) => id !== action.payload.userId)
                  : forum.downvotes.concat(action.payload.userId)
                : [action.payload.userId],
            };
          }
          return forum;
        });
      
    default:
      return forums;
  }
}

export default forumReducer;
