const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
    },
    description :{
        type : String,
        required : true
    },
    round1 :[{
        type : String,
    }], 
    round2 :[{
        type : String,
    }],
    round3 :[{
        type : String,
    }],
    round4 :[{
        type : String,
    }],
    round5 :[{
        type : String,
    }],
    round6 :[{
        type : String,
    }]

});

module.exports = mongoose.model('Workout',WorkoutSchema);