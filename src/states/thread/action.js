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
    dispatch(upvoteForumActionCreator(forumId, userId));

    try {
      await api.upVoteThread(forumId);
    } catch (error) {
        alert(error.message)
        dispatch(upvoteForumActionCreator(forumId, userId))
    }
  };
}

function asyncDownvoteForum(forumId, userId){
    return async (dispatch) => {
        dispatch(downvoteForumActionCreator(forumId, userId))

        try{
            await api.downVoteThread(forumId)
        } catch(error){
            alert(error.message)
            dispatch(downvoteForumActionCreator(forumId, userId))
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
