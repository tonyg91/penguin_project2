/////////////////////////////////////
// Import Dependencies
/////////////////////////////////////

// Import the existing connected mongoose object from connection.js
const mongoose = require("./connections")


//////////////////////////////////////
// Create User Model
/////////////////////////////////////

const {Schema, model} = mongoose

// Make a User Schema 
const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

// Make a user model
const User = model("User", userSchema)

// Log the model to make sure that it exits
// console.log(Anime)

//////////////////////////
// Export User model
/////////////////////////

module.exports = User