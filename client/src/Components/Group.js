import React, { useState, useContext, useEffect} from 'react';
import GroupsService from '../Services/GroupsService';
import Post from './Post';
import CreatePost from './CreatePost';
import './Group.css';

const Group = props => {
    const [group, setGroup] = useState({
        id: '',
        name: '',
        description: '',
        admins: [],
        members: [],
        feed: [],
        loggedInUserDetails: {
            isGroupAdmin: false,
            isGroupMember: false,
            username: ''
        }
    });

    const [post, setPost] = useState({
        text: ''
    });

    let groupId = props.location.state.groupId;

    useEffect(() => {
        GroupsService.getGroupById(groupId).then(data => {
            setGroup(data);
        });
    }, []);

    let membersElements = group.members.map(member => {
        return (
            <div className='labelUser' key={member.id}>{member.username}</div>
        );
    });

    let adminsElements = group.admins.map(admin => {
        return (
            <div className='labelUser' key={admin.id}>{admin.username}</div>
        );
    });
    
    const likeBtnOnClickHandler = (postId) => {
        GroupsService.likePostById(group.id, postId).then(data => {
            // if no errors, update state
            if(!data) {
                likePostInState(postId);
            }
        }
        );
    }

    const likePostInState = (postId) => {
        let postIndex = 0;
        group.feed.forEach(post => {
            if (post.id == postId) {
                post.likes++;
                let currentFeed = [...group.feed];
                currentFeed.splice(postIndex, 1, post);

                setGroup({
                    ...group,
                    feed: currentFeed
                });

                return;
            }
            postIndex++;
        });
    }

    const deleteBtnOnClickHandler = (postId) => {
        GroupsService.deletePostById(group.id, postId).then(data => {
            // if no errors, update state
            if(!data) {
                deletePostInState(postId);
            }
        });
    }

    const deletePostInState = (postId) => {
        let postIndex = 0;
        group.feed.forEach(post => {
            if (post.id == postId) {
                let currentFeed = [...group.feed];
                currentFeed.splice(postIndex, 1);

                setGroup({
                    ...group,
                    feed: currentFeed
                });

                return;
            }
            postIndex++;
        });
    }

    const transformDateTimeCreated = (dateTimeCreated) => {
        let dateTime = new Date(dateTimeCreated);

        return 'Date: ' + dateTime.getDate() + '-'
         + dateTime.getMonth() + '-'
         + dateTime.getFullYear() + ', Time: '
         + dateTime.getHours() + ":" +
         + dateTime.getMinutes() + ":" +
         + dateTime.getSeconds();
    }

    const isUserAllowedToDeletePost = (post) => {
        return group.loggedInUserDetails.isGroupAdmin ||
            (group.loggedInUserDetails.isGroupMember &&
            post.createdBy == group.loggedInUserDetails.username);
    }

    let postsElements = group.feed.map(post => {
        return (
            <Post 
                key={post.id}
                id={post.id}
                createdBy={post.createdBy}
                dateTimeCreated={transformDateTimeCreated(post.dateTimeCreated)}
                text={post.text}
                likes={post.likes}
                likeBtnOnClick={() => likeBtnOnClickHandler(post.id)}
                deleteBtnOnClick={() => deleteBtnOnClickHandler(post.id)}
                isUserAllowedToDelete={isUserAllowedToDeletePost(post)}
                />
        )
    });

    const deleteGroupBtnHandler = () => {
        GroupsService.deleteGroupById(group.id).then(data => {
            // if no error was returned
            props.history.push('/groups');
        });
    }

    const leaveGroupBtnHandler = () => {
        GroupsService.leaveGroupById(group.id).then(data => {
            // if no error was returned
            removeMemberFromState();
        });
    }

    const removeMemberFromState = () => {
        let loggedInUserDetails = {...group.loggedInUserDetails};
        loggedInUserDetails.isGroupMember = false;

        let members = [...group.members];
        let memberIndex = 0;
        members.forEach(member => {
            if (member.username == group.loggedInUserDetails.username) {
                return;
            }
            memberIndex++;
        });
        members.splice(memberIndex, 1);

        setGroup({
            ...group,
            loggedInUserDetails: loggedInUserDetails,
            members: members
        });
    }

    const joinGroupBtnHandler = () => {
        GroupsService.joinGroupById(group.id).then(data => {
            // if no error was returned
            addMemberToState(data);
        });
    }

    const addMemberToState = (newMember) => {
        let loggedInUserDetails = {...group.loggedInUserDetails};
        loggedInUserDetails.isGroupMember = true;

        let members = [...group.members];
        members.push(newMember);

        setGroup({
            ...group,
            loggedInUserDetails: loggedInUserDetails,
            members: members
        });
    }

    let actionButton = null;
    if (group.loggedInUserDetails.isGroupAdmin) {
        actionButton = (
            <button className='group-btn' onClick={deleteGroupBtnHandler}>Delete group</button>
        );
    } else if (group.loggedInUserDetails.isGroupMember) {
        actionButton = (
            <button className='group-btn' onClick={leaveGroupBtnHandler}>Leave group</button>
        );
    } else {
        actionButton = (
            <button className='group-btn' onClick={joinGroupBtnHandler}>Join group</button>
        );
    }

    const postTextOnChangeHandler = (e) => {
        setPost({
            text: e.target.value
        });
    }

    const onSubmitPostHandler = () => {
        GroupsService.addPostToGroupFeed(group.id, post).then(data => {
            // if no error was returned
            addPostToFeedInState(data);
            resetPostText();
        });
    }
    
    const addPostToFeedInState = (post) => {
        let feed = [...group.feed];
        feed.push(post);

        setGroup({
            ...group,
            feed: feed
        });
    }

    const resetPostText = () => {
        setPost({
            text: ''
        });
    }

    const canUserPostInGroup = () => {
        return group.loggedInUserDetails.isGroupAdmin ||
            group.loggedInUserDetails.isGroupMember;
    }

    return (
        <React.Fragment>
        <div className='left'><div className='box'>
        <h2>Group admins</h2>
        {adminsElements}
        </div></div>
        <div className='middle'>
            <div className='box'>
                <h1>Feed</h1>
                <h2>{group.name}</h2>
                <p>{group.description}</p>   

                <div className='FeedGroup'>
                <h2>Create a post</h2>
                {
                    canUserPostInGroup()
                    ? <CreatePost 
                    textValue={post.text} 
                    onSubmitPost={onSubmitPostHandler} 
                    textOnChange={postTextOnChangeHandler} />
                    : <p>You have to be a member of this group to be able add and delete previous posts.</p>
                }

            </div>
                {postsElements}
                {actionButton}
            </div>
        </div>
        <div className='right'>
        <div className='box'>
        <h2>Group members</h2>
        
        {membersElements}
        </div>
         </div>
         </React.Fragment>
    )
}

export default Group;