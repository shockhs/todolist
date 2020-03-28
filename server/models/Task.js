const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
    todoId: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    task: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Task', taskSchema)