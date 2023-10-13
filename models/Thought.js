const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Reaction SubDoc Schema 
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        //Default value to new ObjectID
        default: () => new mongoose.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => new Date(timestamp).toLocaleString()
    }
});

//Thought Schema 
const thoughtSchema = new Schema({
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
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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