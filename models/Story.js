const mongoose = require('mongoose')

const StorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'public',
        enum: ['public', 'private']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'storybook'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('storyinfo', StorySchema)