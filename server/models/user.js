const mongoose = require('mongoose'); 

const userSchema = mongoose.Schema({

    email: {
        type: String, 
        required: false
    }, 

    username: {
        type: String, 
        required: false
    }, 

    password: {
        type: String, 
        required: false
    }, 

    id: {type: String}
}); 

const UserModel = mongoose.model("User", userSchema); 
module.exports = UserModel; 
