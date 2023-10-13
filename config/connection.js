const mongoose = require('mongoose');

//Local DB Connection 
mongoose.connect('mongodb://localhost:27017');

//Export 
module.exports = mongoose.connection;