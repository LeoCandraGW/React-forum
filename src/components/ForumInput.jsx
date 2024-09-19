import React from "react";
import PropTypes from "prop-types";

function ForumInput({ addForum }) {
  const [body, setBody] = React.useState("");
  const [title, setTitle] = React.useState("");

  function addforum() {
    if (body.trim()) {
      addForum(title, body);
      setBody("");
      setTitle("");
    }
  }

  function handleTtitleChange({ target }) {
    if (target.value.length <= 320) {
      setTitle(target.value);
    }
  }

  function handleBodyChange({ target }) {
    if (target.value.length <= 320) {
      setBody(target.value);
    }
  }

  return (
    <div className="talk-input">
      <div className="talk-item">
        <span></span>
        <span></span>
        <span></span>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTtitleChange}
        />
      </div>

      <div className="talk-item">
        <span></span>
        <span></span>
        <span></span>
        <textarea
          type="text"
          placeholder="What are you thinking?"
          value={body}
          onChange={handleBodyChange}
        ></textarea>
      </div>
      <p className="talk-input__char-left">
        <strong>{body.length}</strong>
        /320
      </p>

      <div className="talk-item">
        <span></span>
        <span></span>
        <span></span>
        <button type="submit" onClick={addforum}>
          Start
        </button>
      </div>
    </div>
  );
}

ForumInput.propTypes = {
  addForum: PropTypes.func.isRequired,
};

export default ForumInput;
