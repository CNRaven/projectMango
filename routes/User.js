const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/User');
const Todo = require('../models/Todo');
const Workout = require('../models/Workout');
const Activityfeed = require('../models/Activityfeed');
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
            const workout = new Workout();
            workout.save();
            const newUser = new User({username,password,role,workout});
            newUser.save(err=>{
                if(err)
                    res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
                else
                    res.status(201).json({message : {msgBody : "Account successfully created", msgError: false}});
            });
        }
    });
});
//create workout on register
// userRouter.post('/registerworkout',(req,res)=>{
// const workout = new Workout();
// workout.save(err=>{
//     if(err)
//         res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
//     else{
//         res.status(200).json({message : {msgBody : "Successfully created workout", msgError : false}});
//         }
//     })
// });

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
userRouter.post('/todo',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const todo = new Todo(req.body);
    todo.save(err=>{
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        else{
            req.user.todos.push(todo);
            req.user.save(err=>{
                if(err)
                    res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
                else
                    res.status(200).json({message : {msgBody : "Successfully created todo", msgError : false}});
            });
        }
    })
});
userRouter.post('/workout',passport.authenticate('jwt',{session : false}),async(req,res)=>{
    console.log(req.body);
    const {name, description, round1ex1, round1ex2, round1ex3, round1ex4, round2ex1, round2ex2, round2ex3, round2ex4, round3ex1, round3ex2, round3ex3, round3ex4, round4ex1, round4ex2, round4ex3, round4ex4, round5ex1, round5ex2, round5ex3, round5ex4} = req.body;

    const round1 = [round1ex1, round1ex2, round1ex3, round1ex4];
    const round2 = [round2ex1, round2ex2, round2ex3, round2ex4];
    const round3 = [round3ex1, round3ex2, round3ex3, round3ex4];
    const round4 = [round4ex1, round4ex2, round4ex3, round4ex4];
    const round5 = [round5ex1, round5ex2, round5ex3, round5ex4];

    const workout = new Workout({
        name, description, round1, round2, round3, round4, round5
    });

    workout.save(err=>{
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        else{
            req.user.workout.push(workout);
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
    User.findByIdAndUpdate({_id : req.user._id},{name, age, location, interests, about, goals},(err,newUser)=>{
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

//Activity Feed

userRouter.get('/activityfeed',passport.authenticate('jwt',{session : false}),(req,res)=>{
    User.findById({_id : req.user._id}).populate('activityfeed').exec((err,document)=>{
        console.log(req.body);
        console.log(document);
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        else{
            // console.log(document);
            res.status(200).json({activityfeed: document.activityfeed, 
                authenticated: true
            });
            //passed document to the frontend - location: document.location
        }
    });
});


userRouter.post('/activityfeed',passport.authenticate('jwt',{session : false}),(req,res)=>{
    // console.log(req.body);
    const {text} = req.body;
    const activityfeed = new Activityfeed({text});
    console.log(activityfeed);

    activityfeed.save(err=>{
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured1", msgError: true}});
        else{
            req.user.activityfeed.push(activityfeed);
            req.user.save(err=>{
                if(err)
                    res.status(500).json({message : {msgBody : "Error has occured2", msgError: true}});
                else
                    res.status(200).json({message : {msgBody : "feed created", msgError : false}});
            });
        }
    })
});





// ANDY ADMIN SECTION

// GET method - can be used in insomnia - http://localhost:5000/user/getallusers
userRouter.get('/getallusers',(req,res)=>{
    
    User.find({}).exec((err,document)=>{
        console.log(document)
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
            else{
            res.status(200).json({document, authenticated : true});
            }
    })

});

// Method to delete a user
userRouter.post('/getallusers', async (req,res)=>{
    // let { user } = req.body;

    User.findByIdAndDelete({}).exec((err,document)=>{
        console.log(document)
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
            else{
            res.status(200).json({document, authenticated : true});
            }
    })

});


// END OF ADMIN


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

// userRouter.post('/workout',(req,res)=>{
    // console.log(req.body)
    // const { username,password,role } = req.body;
 
    //     const newWorkout = new workout({username,password,role,workout});
    //         newWorkout.save(err=>{
    //             if(err)
    //                 res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
    //             else{
    //                 res.status(201).json({message : {msgBody : "Workout successfully created", msgError: false}});
    //         }
    // });
// });

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