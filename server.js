/////////////////////////
// Import Dependencies
////////////////////////
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const mongoose = require("mongoose")
const path = require("path")
const { stringify } = require("querystring")

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

//////////////////////////////
// Seed Routes
/////////////////////////////

// Inital seed route
app.get("/anime/seed", (req, res) => {
    // Start anime
    const startAnime = [
        {title: "Attack on Titan",
        img: "https://flxt.tmsimg.com/assets/p19149543_b_v8_aa.jpg",
        description: "Set in a world where humanity lives inside cities surrounded by three enormous walls that protect them from the gigantic man-eating humanoids referred to as Titans",
        video: "https://www.youtube.com/watch?v=bT9csxkth8g"
        }
    ]

    Anime.deleteMany({})
    .then((data) => {
        Anime.create(startAnime)
        .then((data) => {
            res.json(data)
        })
    })
})



/////////////////////////////
// Routes
/////////////////////////////

//  Test route
app.get("/", (req, res) => {
    res.send("This App is working")
})

// Index Route
app.get("/anime", (req, res) => {
    Anime.find({})
    .then((animes) => {
        res.render("anime/index.liquid", {animes})
    })
     // error handeling
     .catch((error) => {
        res.json((error))
    })
})

// New Route 
app.get("/anime/new", (req, res) => {
    res.render("anime/new.liquid")
})

// Create Route
app.post("/anime", (req, res) => {
    Anime.create(req.body)
    .then((animes) => {
        res.redirect("/anime")
    })
      // error handeling
      .catch((error) => {
        res.json((error))
    })
})

// Edit Route
app.get("/anime/:id/edit", (req, res) => {
    const id = req.params.id
    Anime.findById(id)
    .then((anime) => {
        res.render("anime/edit.liquid", {anime})
    })
     // error handeling
     .catch((error) => {
        res.json((error))
    })
})

// Update Route 
app.put("/anime/:id", (req, res) => {
    const id = req.params.id
    Anime.findByIdAndUpdate(id, req.body, {new: true})
    .then((anime) => {
        res.redirect("/anime")
    })
     // error handeling
     .catch((error) => {
        res.json((error))
    })
})

// Delete Route 
app.delete("/anime/:id", (req, res) => {
    const id = req.params.id
    Anime.findByIdAndRemove(id)
    .then((anime) => {
        res.redirect("/anime")
    })
     // error handeling
     .catch((error) => {
        res.json((error))
    })
})

// Show Route
app.get("/anime/:id", (req, res) => {
    const id = req.params.id
    Anime.findById(id)
    .then((anime) => {
        res.render("anime/show.liquid", { anime})
    })
       // error handeling
       .catch((error) => {
        res.json((error))
    })
})
//////////////////////
// Set up listener
/////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))