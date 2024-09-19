import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

function ForumReplyInput({replyForum}){
    const [text, setText] = React.useState('');
  const navigate = useNavigate('/');

  function replyForumHandler() {
    if (text.trim()) {
      replyForum(text);
      setText('');
      navigate('/');
    }
  }

  function handleTextChange({ target }) {
    if (target.value.length <= 320) {
      setText(target.value);
    }
  }

  return (
    <div className="talk-reply-input">
      <textarea type="text" placeholder="Talk your reply" value={text} onChange={handleTextChange} />
      <p className="talk-reply-input__char-left">
        <strong>{text.length}</strong>
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