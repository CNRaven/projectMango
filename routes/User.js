const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/User');
const Todo = require('../models/Todo');
const Workout = require('../models/Workout');
const Group = require('../models/Group');



const signToken = userID =>{
    return JWT.sign({
        iss : "NoobCoder",
        sub : userID
    },"NoobCoder",{expiresIn : "1h"});
}

userRouter.post('/register',(req,res)=>{
    const { username,password,role } = req.body;
    User.findOne({username},(err,user)=>{
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        if(user)
            res.status(400).json({message : {msgBody : "Username is already taken", msgError: true}});
        else{
            const newUser = new User({username,password,role});
            newUser.save(err=>{
                if(err)
                    res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
                else
                    res.status(201).json({message : {msgBody : "Account successfully created", msgError: false}});
            });
        }
    });
});

userRouter.post('/login',passport.authenticate('local',{session : false}),(req,res)=>{
    if(req.isAuthenticated()){
       const {_id,username,role} = req.user;
       const token = signToken(_id);
       res.cookie('access_token',token,{httpOnly: true, sameSite:true}); 
       res.status(200).json({isAuthenticated : true,user : {username, role}});
    }
});

userRouter.get('/logout',passport.authenticate('jwt',{session : false}),(req,res)=>{
    res.clearCookie('access_token');
    res.json({user:{username : "", role : ""},success : true});
});

userRouter.post('/workout',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const workout = new Workout(req.body);
    workout.save(err=>{
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        else{
            // req.user.todos.push(todo);
            req.user.save(err=>{
                if(err)
                    res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
                else
                    res.status(200).json({message : {msgBody : "Successfully created workout", msgError : false}});
            });
        }
    })
});

userRouter.get('/todos',passport.authenticate('jwt',{session : false}),(req,res)=>{
    User.findById({_id : req.user._id}).populate('todos').exec((err,document)=>{
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        else{
            res.status(200).json({todos : document.todos, authenticated : true});
        }
    });
});

userRouter.get('/profile',passport.authenticate('jwt',{session : false}),(req,res)=>{
    User.findById({_id : req.user._id}).populate('users').exec((err,document)=>{
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        else{
            // console.log(document);
            res.status(200).json({
                user_profile: {
                    _id: document._id,
                    name: document.name,
                    age: document.age, 
                    location: document.location, 
                    interests: document.interests, 
                    about: document.about, 
                    goals: document.goals
                }, 
                authenticated: true
            });
            //passed document to the frontend - location: document.location
        }
    });
});

userRouter.put('/profile',passport.authenticate('jwt',{session : false}), async (req,res)=>{
    const { name,age,location, interests,about, goals } = req.body;
    const newUser = new User({ name, age, location, interests, about, goals });
    console.log(req.body)
    User.findByIdAndUpdate({_id : req.user._id},{name, age, location, interests, goals},(err,newUser)=>{
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        else{
            newUser.save(err=>{
                if(err)
                    res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
                else
                    res.status(201).json({message : {msgBody : "Account successfully updated!", msgError: false}});
                    console.log(newUser)

            });
        }
    });
});
    /*
    try {
        let { name, location, interests, about, goals, age } = req.body;

        if (!name || !location || !interets || !about || !goals || !age) {
            return res
                    .status(400)
                    .json({ msg: "Not all fields have been entered." });
        }

        const updateName = await User.findOneAndUpdate();

    } catch(err) {
        res.status(500).json({ error: err.message });
    }
    */



// - /profile in ref to url
// userRouter.get('/profile',passport.authenticate('jwt',{session : false}),(req,res)=>{
//     User.findById({_id : req.user._id}).populate('profile').exec((err,document)=>{
//         if(err)
//             res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
//         else{
//             res.status(200).json({profile : document.profile, authenticated : true});
//         }
//     });
// });


///WORKOUT

userRouter.get('/workout',passport.authenticate('jwt',{session : false}),(req,res)=>{
    User.findById({_id : req.user._id}).populate('workout').exec((err,document)=>{
        console.log(req.body);
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        else{
            // console.log(document);
            res.status(200).json({workout: document.workout, 
                authenticated: true
            });
            //passed document to the frontend - location: document.location
        }
    });
});

userRouter.get('/workout',passport.authenticate('jwt',{session : false}),(req,res)=>{
    User.findById({_id : req.user._id}).populate('workout').exec((err,document)=>{
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        else{
            res.status(200).json({profile : document.profile, authenticated : true});
        }
    });
});


userRouter.get('/admin',passport.authenticate('jwt',{session : false}),(req,res)=>{
    if(req.user.role === 'admin'){
        res.status(200).json({message : {msgBody : 'You are an admin', msgError : false}});
    }
    else
        res.status(403).json({message : {msgBody : "You're not an admin,go away", msgError : true}});
});

userRouter.get('/authenticated',passport.authenticate('jwt',{session : false}),(req,res)=>{
    console.log("connected!");
    const {username,role} = req.user;
    res.status(200).json({isAuthenticated : true, user : {username,role}});
});



module.exports = userRouter;