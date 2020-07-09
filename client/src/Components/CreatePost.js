import React from 'react';

const CreatePost = props => {
    return (
        <div>
            <textarea
                name="createPost"
                onChange={props.textOnChange}
                rows="4"
                cols="50" 
                value={props.textValue}
                style={{resize: 'none'}}/>
            <button onClick={props.onSubmitPost}>Post</button>
        </div>
    );
}

export default CreatePost;