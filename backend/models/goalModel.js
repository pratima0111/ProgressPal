const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'         //user associated with a goal
    },
    text:{
        type:String,
        required:[true, 'Please add a text value']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Goal', goalSchema)