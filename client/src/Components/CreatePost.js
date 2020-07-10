import React from 'react';
import './Group.css';

const CreatePost = props => {
    return (
        <React.Fragment>
            <div className='CreatePost'>
            <textarea
                name="createPost"
                onChange={props.textOnChange}
                rows="4"
                cols="50" 
                value={props.textValue}
                style={{resize: 'none'}}/>
            <button onClick={props.onSubmitPost}>Post</button>
            </div>
            </React.Fragment>
    );
}

export default CreatePost;