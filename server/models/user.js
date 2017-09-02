

var mongoose = require("mongoose")
var { Schema } = mongoose;

var userSchema = new Schema({
    googleId:{
        type:String,
    }
});

var User = mongoose.model('users', userSchema);

module.exports = { User };