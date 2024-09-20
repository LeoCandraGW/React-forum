import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ForumDetail from "../components/ForumDetail";
import ForumItem from "../components/ForumItem";
import ForumReplyInput from "../components/ForumReplyInput";
import {
  asyncReceiveForumDetail,
  asyncupvoteComment,
  asyncdownvoteComment,
} from "../states/threadDetail/action";
import { asyncAddForumComment } from "../states/threadDetail/action";
import ForumDetailCommentList from "../components/ForumDetailCommentList";

function DetailPage() {
  const { id } = useParams();
  const forumDetail = useSelector((states) => states.forumDetail);
  const authUser = useSelector((state) => state.authUser);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(asyncReceiveForumDetail(id));
  }, [dispatch]);

  const onReplyForum = (comments) => {
    dispatch(asyncAddForumComment({ comments, id: id }));
  };

  const onUpvote = (id) => {
    dispatch(asyncupvoteComment(id));
  };

  const onDownvote = (id) => {
    dispatch(asyncdownvoteComment(id));
  };

  if (!forumDetail) {
    return null;
  }

  return (
    <section className="detail-page">
      {forumDetail.parent && (
        <div className="detail-page__parent">
          <h3>Replying To</h3>
          <ForumItem {...forumDetail.parent} authUser={authUser.id} />
        </div>
      )}
      <ForumDetail {...forumDetail} authUser={authUser.id} />
      <ForumReplyInput replyForum={onReplyForum} />
      <ForumDetailCommentList comments={forumDetail.comments} upVote={onUpvote} downVote={onDownvote} />
    </section>
  );
}

export default DetailPage;
