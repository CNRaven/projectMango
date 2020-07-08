const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
        default : "This is workout name"
    },
    description :{
        type : String,
        required : true,
        default : "This is workout description"

    },
    round1 :{
        type : Array,
        required : true,
        default : ["Push-ups", "Star-Jumps", "Squats", "Crunches"]
        
    }, 
    round2 :{
        type : Array,
        required : true,
        default : ["Burpees", "High-Knees", "Lunges", "Plank"]

    },
    round3 :{
        type : Array,
        required : true,
        default : ["Push-ups", "Star-Jumps", "Squats", "Crunches"]
    },
    round4 :{
        type : Array,
        required : true,
        default : ["Burpees", "High-Knees", "Lunges", "Plank"]
    },
    round5 :{
        type : Array,
        required : true,
        default : ["Push-ups", "Star-Jumps", "Squats", "Crunches"]

    }

});

module.exports = mongoose.model('Workout',WorkoutSchema);
