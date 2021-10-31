/////////////////////////////////////
// Import Dependencies
/////////////////////////////////////

const { VirtualType } = require("mongoose")
const mongoose = require("./connections")

/////////////////////////////
// Model
////////////////////////////
const {Schema, model} = mongoose

// Anime Schema
const favSchema = new Schema({
    title: String,
    img: String,
    description: String,
    video: String

})

const FAVS = model("FAVS", favSchema)

/////////////////////////////
// Export Anime Model
////////////////////////////
module.exports = FAVS