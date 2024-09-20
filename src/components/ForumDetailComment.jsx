import React from "react";
import PropTypes from "prop-types";
import { FaRegThumbsUp, FaThumbsUp, FaRegThumbsDown, FaThumbsDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { postedAt } from "../utils/datePosted";

function ForumDetailComment({
  id,
  content,
  createdAt,
  upVotesBy,
  downVotesBy,
  owner,
  upVote,
  downVote,
}) {
  const navigate = useNavigate();

  const isUpVotes = upVotesBy.includes(owner.id);

  const isDownVotes = downVotesBy.includes(owner.id);

  const onUpVotes = (event) => {
    event.stopPropagation();
    upVote(id);
    window.location.reload();
  };

  const onDownVotes = (event) => {
    event.stopPropagation();
    downVote(id);
    window.location.reload();
  };

//   const onCommentClick = () => {
//     navigate(`/forums/${id}`);
//   };

//   const onCommentPress = (event) => {
//     if (event.key === "Enter" || event.key === " ") {
//       navigate(`/comments/${id}`);
//     }
//   };

  return (
    <div
      role="button"
      tabIndex={0}
      className="talk-item"
    //   onClick={onCommentClick}
    //   onKeyDown={onCommentPress}
    >
      <span></span>
      <span></span>
      <span></span>
      <div className="talk-item__user-photo">
        {owner && owner.avatar ? (
          <img src={owner.avatar} alt={owner.name} />
        ) : (
          <p>No Avatar</p>
        )}
      </div>
      <div className="talk-item__detail">
        <header>
          <div className="talk-item__user-info">
            <p className="talk-item__user-name">{owner?.name}</p>
            <p className="talk-item__user-id">@{owner?.id}</p>
          </div>
          <p className="talk-item-created-at">{postedAt(createdAt)}</p>
        </header>
        <article>
          <p className="talk-item__text">{content}</p>
        </article>
        <div className="updownvote">
          {upVote && (
            <div className="talk-item__likes">
              <p>
                <button type="button" aria-label="like" onClick={onUpVotes}>
                  {isUpVotes ? (
                    <FaThumbsUp style={{ color: "red" }} />
                  ) : (
                    <FaRegThumbsUp />
                  )}
                </button>{" "}
                {upVotesBy.length}
              </p>
            </div>
          )}
          {downVote && (
            <div className="talk-item__likes">
              <p>
                <button type="button" aria-label="like" onClick={onDownVotes}>
                  {isDownVotes ? (
                    <FaThumbsDown style={{ color: "red" }} />
                  ) : (
                    <FaRegThumbsDown />
                  )}
                </button>{" "}
                {downVotesBy.length}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="box">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const ForumDetailCommentShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  owner: PropTypes.shape(userShape).isRequired,
  
};

ForumDetailComment.propTypes = {
  ...ForumDetailCommentShape,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
};

// ForumItem.defaultProps = {
//   upVote: null,
//   downVote: null,
// };

export { ForumDetailCommentShape };

export default ForumDetailComment;
