const mongoose = require('mongoose')
const Schema = mongoose.Schema

const liftSchema = new Schema({
    date: { type: Date, required: true },
    name: { type: String, required: true },
    reps: {
        type: Number,
        min: [1, 'No such thing as a 0 rep max'],
        required: [true, 'You must provide reps'],
    },
    weight: {
        type: Number,
        min: [0.25, 'Need a weight'],
        required: [true, 'You must provide a weight'],
    },
    updated: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = mongoose.model('lift', liftSchema)
