const mongoose = require('mongoose');

//Thought Schema 
const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => new Date(timestamp).toLocaleString()
    },
    username: {
        type: String,
        required: true
    },
    reactions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Reaction'
        }
    ]
})

//Enable getters when documents are queried 
thoughtSchema.set('toObject', {getters: true});
thoughtSchema.set('toJSON', { getters: true});

const Thought = mongoose.model('Thoughts', thoughtSchema);

module.exports = Thought;