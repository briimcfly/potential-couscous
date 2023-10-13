const mongoose = require('mongoose');

const reactionSchema = require('./Reaction');

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
    //Imported Reaction Schema 
    reactions: [reactionSchema]
},
{
    //Include virtuals when converting to JSON
    toJSON: {
        virtuals: true,
        getters: true
    },
    //Include virtuals when converting to Objects
    toObject: {
        virtuals: true,
        getters: true
    }
});

//reactionCount virtual 
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = mongoose.model('Thoughts', thoughtSchema);

module.exports = Thought;