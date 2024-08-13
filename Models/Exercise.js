const mongoose = require('mongoose')

const ExerciseSchema = new mongoose.Schema({
    exName: {
        type: String,
        required: true,
    },
    sets:{
        type: Number,
        required: true
    },
    reps:{
        type: Number,
        required: true
    }
})

const Exercise = mongoose.model('Exercise', ExerciseSchema);
module.exports = Exercise;