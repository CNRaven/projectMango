import React from 'react';

const Post = props => {
    let deletePostBtn = null;
    if (props.isUserAllowedToDelete) {
        deletePostBtn = (  
            <button onClick={props.deleteBtnOnClick}>Delete post</button>
        );
    }

    return (
        <div>
            <p>Created by: {props.createdBy}</p>
            <p>{props.dateTimeCreated}</p>
            <p>{props.text}</p>
            <div>
                <button onClick={props.likeBtnOnClick}>Like</button>
                <span>{props.likes}</span>
            </div>
            {deletePostBtn}
        </div>
    );
}

export default Post;