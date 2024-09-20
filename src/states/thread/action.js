import api from "../../utils/api";

const ActionType = {
  RECEIVE_FORUMS: "RECEIVE_FORUMS",
  ADD_FORUM: "ADD_FORUM",
  UPVOTE_FORUM: "UPVOTE_FORUM",
  DOWNVOTE_FORUM: "DOWNVOTE_FORUM",
};

function receiveForumsActionCreator(forums) {
  return {
    type: ActionType.RECEIVE_FORUMS,
    payload: {
      forums,
    },
  };
}

function addForumActionCreator(forum) {
  return {
    type: ActionType.ADD_FORUM,
    payload: {
      forum,
    },
  };
}

function upvoteForumActionCreator(forumId, userId) {
  return {
    type: ActionType.UPVOTE_FORUM,
    payload: {
      forumId,
      userId
    },
  };
}

function downvoteForumActionCreator(forumId, userId) {
  return {
    type: ActionType.DOWNVOTE_FORUM,
    payload: {
      forumId,
      userId
    },
  };
}

function asyncAddForum({ title, body }) {
  return async (dispatch) => {
    try {
      const forum = await api.createThread({ title, body });
      dispatch(addForumActionCreator(forum));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncUpvoteForum(forumId, userId) {
  return async (dispatch) => {
    
    try {
      await api.upVoteThread(forumId);
      dispatch(upvoteForumActionCreator(forumId, userId));
    } catch (error) {
        // alert(error.message)
    }
  };
}

function asyncDownvoteForum(forumId, userId){
    return async (dispatch) => {
      try{
        await api.downVoteThread(forumId)
        dispatch(downvoteForumActionCreator(forumId, userId))
        } catch(error){
            // alert(error.message)
        }
    }
}

export {
    ActionType,
    receiveForumsActionCreator,
    addForumActionCreator,
    upvoteForumActionCreator,
    downvoteForumActionCreator,
    asyncAddForum,
    asyncUpvoteForum,
    asyncDownvoteForum
}
