const mongoose = require('mongoose');

//Local DB Connection 
mongoose.connect('mongodb://localhost:27017/yourDBname', { 
    //Mongoose, Use Mongo's new URL Parser
    useNewUrlParser: true,
    //Mongoose, Use Mongo's new Server Discover/Monitoring Engine
    useUnifiedTopology: true
});

//Export 
module.exports = mongoose.connection;