/////////////////////////////////////
// Import Dependencies
/////////////////////////////////////

const mongoose = require("./connections")

/////////////////////////////
// Model
////////////////////////////
const {Schema, model} = mongoose

// Anime Schema
const animeSchema = new Schema({
    title: String,
    img: String,
    description: String,
    video: String

})

const Anime = model("Anime", animeSchema)

/////////////////////////////
// Export Anime Model
////////////////////////////
module.exports = Anime