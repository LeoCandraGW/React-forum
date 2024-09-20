import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

function ForumReplyInput({replyForum}){
    const [comments, setComments] = React.useState('');
  const navigate = useNavigate();

  function replyForumHandler() {
    if (comments.trim()) {
      replyForum(comments);
      setComments('');
      navigate('/');
    }
  }

  function handleTextChange({ target }) {
    if (target.value.length <= 320) {
      setComments(target.value);
    }
  }

  return (
    <div className="talk-reply-input">
      <textarea type="text" placeholder="Talk your reply" value={comments} onChange={handleTextChange} />
      <p className="talk-reply-input__char-left">
        <strong>{comments.length}</strong>
        /320
      </p>
      <button type="submit" onClick={replyForumHandler}>Reply</button>
    </div>
  );
}

ForumReplyInput.propTypes = {
  replyForum: PropTypes.func.isRequired,
};

export default ForumReplyInput