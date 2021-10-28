/////////////////////////
// Import Dependencies
////////////////////////
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
// const mongoose = require("mongoose") << Not needed in MVC
const path = require("path")

const AnimeRouter = require("./controllers/anime")


/////////////////////////////////
// Liquid configuration
////////////////////////////////

// Import liquid
const liquid = require("liquid-express-views")

// construct an absolute path to our views folder 
const viewsFolder = path.resolve(__dirname, "views/")
// Test run
// console.log(viewsFolder)

// create an app object with liquid, passing the path to the views folder
const app = liquid(express(), {root: viewsFolder})


//////////////////////////////////
// Middleware
//////////////////////////////////

// Method Override
app.use(methodOverride("_method"))

// urlencoded
app.use(express.urlencoded({extended: true}))

// Public file connection
app.use(express.static("public"))



/////////////////////////////
// Routes
/////////////////////////////

//  Test route
app.get("/", (req, res) => {
    res.send("This App is working")
})

// Register Anime Router 
app.use("/anime", AnimeRouter)

//////////////////////
// Set up listener
/////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))