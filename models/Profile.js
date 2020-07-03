const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    description : {
        type : String,
        required : true
    },

    age : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('Profile', ProfileSchema);