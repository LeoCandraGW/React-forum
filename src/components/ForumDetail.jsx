import React from "react";
import PropTypes from "prop-types";
import { FaRegThumbsUp, FaThumbsUp, FaRegThumbsDown, FaThumbsDown } from "react-icons/fa";
import { postedAt } from "../utils/datePosted";

function ForumDetail({
  id,
  title,
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
        <h2>{title}</h2>
        <p className="talk-detail__text">{body}</p>
      </article>
      <footer>
        <div className="talk-detail__like">
          <button type="button" aria-label="like" onClick={() => upVoteComment(id)}>
            {isCommentUpVoted ? (
              <FaThumbsUp style={{ color: "red" }} />
            ) : (
              <FaRegThumbsUp />
            )}
          </button>
          <span>{upVotesBy.length}</span>
        </div>
        <div className="talk-detail__like">
          <button type="button" aria-label="like" onClick={() => downVoteComment(id)}>
            {isCommentDownVoted ? (
              <FaThumbsDown style={{ color: "red" }} />
            ) : (
              <FaRegThumbsDown />
            )}
          </button>
          <span>{downVotesBy.length}</span>
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
