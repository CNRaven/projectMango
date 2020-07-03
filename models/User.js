const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username :{
        type : String,
        required : true,
        min : 6,
        max : 15
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['user','admin'],
        required: true
    },
    name: {
        type : String,
        default: "Enter name",
        required : true
    },
    age: {
        type : Number,
        default: 0,
        required : true
    },
    location: {
        type : String,
        default: "City, UK",
        required : true

    },
    interests: {
        type : String,
        default: "Enter your favourite sports and activities",
        required : true 
    },
    about: {
        type : String,
        default: "Tell everyone a little more about yourself",
        required : true
    }, 
    goals: {
        type : String,
        default: "Example: To lose weight, to build muscle, to run 10km",
        required : true
    },

    todos : [{type : mongoose.Schema.Types.ObjectId, ref: 'Todo'}],

    profile : [{type : mongoose.Schema.Types.ObjectId, ref: 'Profile'}]
});

UserSchema.pre('save',function(next){
    if(!this.isModified('password'))
        return next();
    bcrypt.hash(this.password,10,(err,passwordHash)=>{
        if(err)
            return next(err);
        this.password = passwordHash;
        next();
    });
});

UserSchema.methods.comparePassword = function(password,cb){
    bcrypt.compare(password,this.password,(err,isMatch)=>{
        if(err)
            return cb(err);
        else{
            if(!isMatch)
                return cb(null,isMatch);
            return cb(null,this);
        }
    });
}

module.exports = mongoose.model('User',UserSchema);