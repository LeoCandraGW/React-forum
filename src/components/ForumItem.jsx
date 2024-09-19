import React from "react";
import PropTypes from "prop-types";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { postedAt } from "../utils/datePosted";

function ForumItem({
  id,
  body,
  createdAt,
  upVotesBy,
  downVotesBy,
  user,
  authUser,
  upVote,
  downVote,
}) {
  const navigate = useNavigate();

  const isUpVotes = upVotesBy.includes(authUser);

  const isDownVotes = downVotesBy.includes(authUser);

  const onUpVotes = (event) => {
    event.stopPropagation();
    upVote(id);
  };

  const onDownVotes = (event) => {
    event.stopPropagation();
    downVote(id);
  };

  const onCommentClick = () => {
    navigate(`/forums/${id}`);
  };

  const onCommentPress = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      navigate(`/comments/${id}`);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className="talk-item"
      onClick={onCommentClick}
      onKeyDown={onCommentPress}
    >
      <div className="talk-item__user-photo">
        {user && user.avatar ? (
          <img src={user.avatar} alt={user.name} />
        ) : (
          <p>No Avatar</p>
        )}
      </div>
      <div className="talk-item__detail">
        <header>
          <div className="talk-item__user-info">
            <p className="talk-item__user-name">{user?.name}</p>
            <p className="talk-item__user-id">@{user?.id}</p>
          </div>
          <p className="talk-item-created-at">{postedAt(createdAt)}</p>
        </header>
        <article>
          <p className="talk-item__text">{body}</p>
        </article>
        <div className="updownvote">
          {upVote && (
            <div className="talk-item__likes">
              <p>
                <button type="button" aria-label="like" onClick={onUpVotes}>
                  {isUpVotes ? (
                    <FaHeart style={{ color: "red" }} />
                  ) : (
                    <FaRegHeart />
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
                    <FaHeart style={{ color: "red" }} />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>{" "}
                {downVotesBy.length}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const ForumItemShape = {
  id: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  user: PropTypes.shape(userShape).isRequired,
  authUser: PropTypes.string.isRequired,
};

ForumItem.propTypes = {
  ...ForumItemShape,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
};

ForumItem.defaultProps = {
  upVote: null,
  downVote: null,
};

export { ForumItemShape };

export default ForumItem;
