//////////////////////////////
// Import Dependencies
//////////////////////////////

require("dotenv").config()
const mongoose = require("mongoose")

//////////////////////////
// Database Connection
//////////////////////////
const DATABASE_URL = process.env.DATABASE_URL

// Remove Error pop ups in console.
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// Mongoose Connection
mongoose.connect(DATABASE_URL, CONFIG)

// Connection Messages to verify connection
mongoose.connection
.on("open", () => console.log("Connected to Mongo"))
.on("close", () => console.log("Disconnected from mongo"))
.on("error", (error) => console.log(error))

//////////////////////////////////
// Export the Connection
///////////////////////////////////

module.exports = mongoose