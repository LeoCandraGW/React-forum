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
import { asyncAddForum } from "../states/thread/action";

function DetailPage() {
  const { id } = useParams();
  const forumDetail = useSelector((states) => states.forumDetail);
  const authUser = useSelector((state) => state.authUser);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(asyncReceiveForumDetail(id));
  }, [dispatch]);

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
    </section>
  );
}

export default DetailPage;
