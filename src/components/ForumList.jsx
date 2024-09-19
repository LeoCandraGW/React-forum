import React from "react";
import PropTypes from "prop-types";
import ForumItem, { ForumItemShape } from "./ForumItem";

function ForumList({ comments, upVote, downVote }) {
  return (
    <div className="talks-list">
      {comments.map((comment) => (
        <ForumItem
          key={comment.id}
          {...comment}
          upVote={upVote}
          downVote={downVote}
        />
      ))}
    </div>
  );
}

ForumList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(ForumItemShape)).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export default ForumList;
