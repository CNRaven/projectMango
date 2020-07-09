const express = require('express');
const groupRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const Group = require('../models/Group');
const User = require('../models/User');
const Feed = require('../models/Feed');

// create the group
groupRouter.post('/', passport.authenticate('jwt',{session : false}), async (req, res) => {
    console.log(req.user._id);
    try {
        let { name, description } = req.body;
        let createdBy = req.user._id;
        let createdDateTime = new Date();
        let admins = [req.user._id];
        let members = [req.user._id];

        const group = new Group({
            name,
            description,
            createdBy,
            createdDateTime,
            admins,
            members
        });

        if (!name || !description)
            return res
                .status(400)
                .json({ msg: "Not all fields have been entered." });
        
        const saveGroup = await group.save();
        let filteredSaveGroup = {
            id: saveGroup._id,
            name: saveGroup.name,
            description: saveGroup.description
        }
        res.status(200).json(filteredSaveGroup);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//get all groups
groupRouter.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const groups = await Group.find({});
        const groupsArray = groups.map(group => {
            let filteredGroup = {
                id: group._id,
                name: group.name,
                description: group.description
            }
            return filteredGroup;
        });

        res.json(groupsArray);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//get group by id
groupRouter.get('/:groupId', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const userId = req.user._id;
        const groupId = req.params.groupId;
        const group = await Group.findById({_id: groupId});

        let loggedInUser = await User.findById({_id: userId});

        let loggedInUserDetails = {};
        
        if(loggedInUser) {
            loggedInUserDetails = {
                username: loggedInUser.username,
                isAdminUser: loggedInUser.role == "admin",
                isGroupAdmin: false,
                isGroupMember: false
            };
        }

        let adminsWithUsernames = [];
        await Promise.all(group.admins.map(async (adminId) => {
            let user = await User.findById({_id: adminId});

            let admin = {
                id: adminId,
                username: 'Deleted user'
            }

            if (user) {
                if (user._id.toString() == userId) {               
                    loggedInUserDetails.isGroupAdmin = true;
                }
                admin.username = user.username;
            }
            adminsWithUsernames.push(admin);
        }));

        let membersWithUsernames = [];
        await Promise.all(group.members.map(async (memberId) => {
            let user = await User.findById({_id: memberId});

            let member = {
                id: memberId,
                username: 'Deleted user'
            }

            if (user) {
                if (user._id.toString() == userId) {
                    loggedInUserDetails.isGroupMember = true;
                }
                member.username = user.username;
            }
            membersWithUsernames.push(member);
        }));

        let posts = [];
        await Promise.all(group.feed.map(async (postId) => {
            let post = await Feed.findById({_id: postId});

            let user = await User.findById({_id: post.createdBy});

            let mappedPost = {
                id: post._id,
                createdBy: "Deleted user",
                dateTimeCreated: post.dateTimeCreated,
                text: post.text,
                likes: post.likes
            }
            if (user) {
                mappedPost.createdBy = user.username;
            }
            posts.push(mappedPost);
        }));

        let filteredGroup = {
            id: group._id,
            name: group.name,
            description: group.description,
            admins: adminsWithUsernames,
            members: membersWithUsernames,
            feed: posts,
            loggedInUserDetails: loggedInUserDetails
        }

        res.json(filteredGroup);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    
});

//join group by id
groupRouter.post('/:groupId/join', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const userId = req.user._id;
        const groupId = req.params.groupId;
        
        const group = await Group.findById({_id: groupId});
        let existingMembers = group.members;

         // (optional) check if the userId exists in the users db
        if (existingMembers.includes(userId)) {
            return res
                .status(400)
                .json({ msg: "This user is already a member of the group." });
        }

        // update group identified by groupId such that members contains the userId
            
        existingMembers.push(userId);

        await Group.updateOne({_id: groupId}, {members: existingMembers}, function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log(`Successfully updated the document with id ${groupId}`);
            }
        });

        let user = await User.findById({_id: userId});

        let newMember = {
            id: userId,
            username: user.username
        }

        return res.status(200).json(newMember);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }    
});

//leave group by id
groupRouter.post('/:groupId/leave', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const userId = req.user._id;
        const groupId = req.params.groupId;
        
        const group = await Group.findById({_id: groupId});
        let existingMembers = group.members;

        // (optional) check if the userId exists in the users db
        let userIndex = existingMembers.indexOf(userId);
        if (userIndex == -1) {
            return res
                .status(400)
                .json({ msg: "This user is not a member of the group." });
        }

        // update group identified by groupId such that members contains the userId
            
        existingMembers.splice(userIndex, 1);

        await Group.updateOne({_id: groupId}, {members: existingMembers}, function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log(`Successfully updated the document with id ${groupId}`);
            }
        });

        return res.status(200).json({});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }    
});

//delete a group
groupRouter.post('/:groupId/delete', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const group = await Group.findById({_id: groupId});

        if (!group) {
            return res
                .status(400)
                .json({ msg: "This group does not exist and can't be deleted." });
        }

        await Group.deleteOne({_id: groupId}, function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log(`Successfully deleted the document with id ${groupId}`);
            }
        });

        return res.status(200).json({});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }    
});

//add content to feed
groupRouter.post('/:groupId/feed', passport.authenticate('jwt',{session : false}), async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const createdBy = req.user._id;
        const { text } = req.body;

        if (!text) {
            return res
                .status(400)
                .json({ msg: "Text field has not been completed." });
        }
        
        const group = await Group.findById({_id: groupId});
        let existingFeedContent = group.feed;
        let dateTimeCreated = new Date();
        const feedContent = new Feed({
            dateTimeCreated,
            createdBy,
            text
        });

        const saveFeedContent = await feedContent.save();
        existingFeedContent.push(saveFeedContent);

        await Group.updateOne({_id: groupId}, {feed: existingFeedContent}, function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log(`Successfully updated the document with id ${groupId}`);
            }
        });

        let user = await User.findById({_id: createdBy});

        let savedPost = {
            id: saveFeedContent._id,
            createdBy: user.username,
            dateTimeCreated: saveFeedContent.dateTimeCreated,
            text: saveFeedContent.text,
            likes: saveFeedContent.likes
        }

        return res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }   
});

//like post in group feed
groupRouter.post('/:groupId/feed/:postId/like', passport.authenticate('jwt',{session : false}), async (req, res) => {
    try {
        const postId = req.params.postId;

        let post = await Feed.findById({_id: postId});

        post.likes = post.likes + 1;

        await post.save();

        return res.status(200).json({});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }   
});

//delete a post from group feed
groupRouter.post('/:groupId/feed/:postId/delete', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const postId = req.params.postId;

        const group = await Group.findById({_id: groupId});

        // update feed to remove the post with a certain postId
        let postIndex = group.feed.indexOf(postId);
        if (postIndex != -1) {
            group.feed.splice(postIndex, 1);
        }

        await group.save();

        // delete post from feed collection
        await Feed.deleteOne({_id: postId}, function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log(`Successfully deleted the post with id ${postId}`);
            }
        });

        return res.status(200).json({});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }    
});

module.exports = groupRouter;