import React from "react";
import PropTypes from "prop-types";
import ForumItem, { ForumItemShape } from "./ForumItem";
import ForumDetailComment, {ForumDetailCommentShape} from "./ForumDetailComment";
function ForumDetailCommentList({ comments, upVote, downVote }) {
  return (
    <div className="talks-list">
      {comments.map((comment) => (
        <ForumDetailComment
          key={comment.id}
          {...comment}
          upVote={upVote}
          downVote={downVote}
        />
      ))}
    </div>
  );
}

ForumDetailCommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(ForumDetailCommentShape)).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export default ForumDetailCommentList;
