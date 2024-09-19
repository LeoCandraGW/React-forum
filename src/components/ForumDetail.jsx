import React from "react";
import PropTypes from "prop-types";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { postedAt } from "../utils/datePosted";

function ForumDetail({
  id,
  body,
  createdAt,
  upVotesBy,
  downVotesBy,
  owner,
  authUser,
  upVoteComment,
  downVoteComment,
}) {
  const isCommentUpVoted = upVotesBy.includes(authUser);
  const isCommentDownVoted = downVotesBy.includes(authUser);

  return (
    <section className="talk-detail">
      <header>
        <img src={owner.avatar} alt={owner} />
        <div className="talk-detail__user-info">
          <p className="talk-detail__user-name">{owner.name}</p>
          <p className="talk-detail__user-id">@{owner.id}</p>
        </div>
      </header>
      <article>
        <p className="talk-detail__text">{body}</p>
      </article>
      <footer>
        <div className="talk-detail__like">
          <button type="button" aria-label="like" onClick={() => upVoteComment(id)}>
            {isCommentUpVoted ? (
              <FaHeart style={{ color: "red" }} />
            ) : (
              <FaRegHeart />
            )}
          </button>
          <span>{upVotesBy.length} Likes</span>
        </div>
        <div className="talk-detail__like">
          <button type="button" aria-label="like" onClick={() => downVoteComment(id)}>
            {isCommentDownVoted ? (
              <FaHeart style={{ color: "red" }} />
            ) : (
              <FaRegHeart />
            )}
          </button>
          <span>{downVotesBy.length} Likes</span>
        </div>
        <p className="talk-detail__created-at">{postedAt(createdAt)}</p>
      </footer>
    </section>
  );
}

const userShape = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
}

ForumDetail.propTypes = {
    id: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    owner: PropTypes.shape(userShape).isRequired,
    authUser: PropTypes.string.isRequired,
    upVoteComment: PropTypes.func,
    downVoteComment: PropTypes.func
}

export default ForumDetail
