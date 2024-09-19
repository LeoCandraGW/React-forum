import React from 'react'
import PropTypes from 'prop-types'

function ForumInput({addForum}){
    const [body, setBody] = React.useState('')
    const [title, setTitle] = React.useState('')

    function addforum(){
        if (body.trim()){
            addForum(title, body)
            setBody('')
            setTitle('')
        }
    }

    function handleTtitleChange({target}){
        if(target.value.length <=320){
            setTitle(target.value)
        }
    }

    function handleBodyChange({target}){
        if(target.value.length <=320){
            setBody(target.value)
        }
    }

    return (
        <div className='talk-input'>
            <input type="text" placeholder='Title' value={title} onChange={handleTtitleChange} />
            <textarea type='text' placeholder='What are you thinking?' value={body} onChange={handleBodyChange}></textarea>
            <p className='talk-input__char-left'>
                <strong>{body.length}</strong>
                /320
            </p>
            <button type='submit' onClick={addforum}>Start</button>
        </div>
    )
}

ForumInput.propTypes = {
    addForum: PropTypes.func.isRequired
}

export default ForumInput