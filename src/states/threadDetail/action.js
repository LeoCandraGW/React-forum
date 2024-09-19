import api from "../../utils/api";

const ActionType = {
    RECEIVE_FORUM_DETAIL: 'RECEIVE_FORUM_DETAIL',
    CLEAR_FORUM_DETAIL: 'CLEAR_FORUM_DETAIL',
    UPVOTE_FORUM_COMMENT: 'UPVOTE_FORUM_COMMENT',
    DOWNVOTE_FORUM_COMMENT: 'DOWNVOTE_FORUM_COMMENT'
}

function receiveForumDetailActionCreator(forumDetail){
    return{
        type: ActionType.RECEIVE_FORUM_DETAIL,
        payload:{
            forumDetail
        }
    }
}

function clearForumDetailActionCreator(){
    return {
        type: ActionType.CLEAR_FORUM_DETAIL,
    }
}

function upvoteCommentActionCreator({threadId, commentId, userId}){
    return {
        type: ActionType.UPVOTE_FORUM_COMMENT,
        payload : {
            threadId, commentId, userId
        }
    }
}

function downvoteCommentActionCreator({threadId, commentId, userId}){
    return {
        type: ActionType.DOWNVOTE_FORUM_COMMENT,
        payload: {
            threadId, commentId, userId
        }
    }
}

function asyncReceiveForumDetail(forumId){
    return async(dispatch) => {
        dispatch(clearForumDetailActionCreator())

        try{
            const forumDetail = await api.getDetailThread(forumId)
            dispatch(receiveForumDetailActionCreator(forumDetail))
        } catch (error){
            alert(error.message)
        }
    }
}

function asyncupvoteComment({threadId,commentId}){
    return async (dispatch, getState) => {
        const forumDetail = getState()
        dispatch(upvoteCommentActionCreator(threadId, commentId))

        try {
            await api.upVoteComment(forumDetail.id, commentId)
        } catch (error){
            alert(error.message)
        }
    }
}

function asyncdownvoteComment({threadId, commentId}){
    return async (dispatch, getState) =>{
        const forumDetail = getState()
        dispatch(downvoteCommentActionCreator(threadId, commentId))

        try{
            await api.downVoteComment(forumDetail.id, comment.id)
        } catch (error) {
            alert(error.message)
        }
    }
}

export {
    ActionType,
    receiveForumDetailActionCreator,
    clearForumDetailActionCreator,
    upvoteCommentActionCreator,
    downvoteCommentActionCreator,
    asyncReceiveForumDetail,
    asyncupvoteComment,
    asyncdownvoteComment
}