import React from 'react';

const Post = props => {
    return (
        <div>
            <p>Created by: {props.createdBy}</p>
            <p>{props.dateTimeCreated}</p>
            <p>{props.text}</p>
            <div>
                <button onClick={props.likeBtnOnClick}>Like</button>
                <span>{props.likes}</span>
            </div>
            <button onClick={props.deleteBtnOnClick}>Delete post</button>
        </div>
    );
}

export default Post;