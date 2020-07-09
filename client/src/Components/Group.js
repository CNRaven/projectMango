import React, { useState, useContext, useEffect} from 'react';
import GroupsService from '../Services/GroupsService';
import Post from './Post';
import CreatePost from './CreatePost';

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
            <p key={member.id}>{member.username}</p>
        );
    });

    let adminsElements = group.admins.map(admin => {
        return (
            <p key={admin.id}>{admin.username}</p>
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
                // isUserAllowedToDelete={isUserAllowedToDeletePost(post)}
                />
        )
    });

    const isUserAllowedToDeletePost = (post) => {

    }

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
            <button onClick={deleteGroupBtnHandler}>Delete group</button>
        );
    } else if (group.loggedInUserDetails.isGroupMember) {
        actionButton = (
            <button onClick={leaveGroupBtnHandler}>Leave group</button>
        );
    } else {
        actionButton = (
            <button onClick={joinGroupBtnHandler}>Join group</button>
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

    return (
        <div>
            <div>
                <p>{group.name}</p>
                <p>{group.description}</p>
            </div>
            <div>
                <p>Feed</p>
                <CreatePost 
                    textValue={post.text} 
                    onSubmitPost={onSubmitPostHandler} 
                    textOnChange={postTextOnChangeHandler} />
                {postsElements}
            </div>
            <div>
                <p>Group admins</p>
                {adminsElements}
                <p>Group members</p>
                {membersElements}
                {actionButton}
            </div>
        </div>
    )
}

export default Group;