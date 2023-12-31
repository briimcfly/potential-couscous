const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema 
const userSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        //regex for email validation 
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: {
        versionKey:false
    }
});

//friendCount virtual
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

const User = mongoose.model('User', userSchema);

module.exports = User;