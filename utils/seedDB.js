const mongoose = require('mongoose');
const db = require('../config/connection');

const { User, Thought } = require('../models');

//User Seeds 
const userData = [
    {
        username: 'briimcfly',
        email: 'bickel@hey.com'
    },
    {
        username: 'thatbandlightweight',
        email: 'lightweightband@gmail.com'
    }
];

User.insertMany(userData)
    .then(insertedUsers => {
        const thoughtData = [
            {
                thoughtText: "I really like that band Lightweight!",
                username: insertedUsers[0].username,
                userId: insertedUsers[0]._id,
                reactions:[
                    {
                        reactionBody: "Thank you!",
                        username: insertedUsers[1].username,
                        userId: insertedUsers[1]._id
                    }
                ]
            },
            {
                thoughtText: 'We have a show on Friday!',
                username: insertedUsers[1].username,
                userId: insertedUsers[1]._id
            }
        ];

        return Thought.insertMany(thoughtData);
    })
    .then(() => {
        console.log('Data seeded!');
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    })