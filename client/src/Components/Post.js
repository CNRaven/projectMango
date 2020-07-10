import React from 'react';

const Post = props => {
    let deletePostBtn = null;
    if (props.isUserAllowedToDelete) {
        deletePostBtn = (  
            <button className='like-btn' onClick={props.deleteBtnOnClick}>Delete post</button>
        );
    }

    return (
        <div className='box'>
            <img src='run.jpg'></img>
            <h3>{props.text}</h3>
            <div className='postBoxInfo'>
            <button className='like-btn' onClick={props.likeBtnOnClick}>
                Like : {props.likes}
               
                </button>
                <div className='labelPost'>
            <h4>Created by: {props.createdBy}</h4>
            <p>{props.dateTimeCreated}</p>
            </div>
            <div>
                
                
                {deletePostBtn}
            </div>
            </div>
            
        </div>
    );
}

export default Post;