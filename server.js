/////////////////////////
// Import Dependencies
////////////////////////
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
// const mongoose = require("mongoose") << Not needed in MVC
const path = require("path")
const Anime = require("./models/anime")
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

// Inital seed route
app.get("/anime/seed", (req, res) => {
    // Start anime
    const startAnime = [
        {title: "Attack on Titan",
        img: "https://flxt.tmsimg.com/assets/p19149543_b_v8_aa.jpg",
        description: "Set in a world where humanity lives inside cities surrounded by three enormous walls that protect them from the gigantic man-eating humanoids referred to as Titans",
        video: "https://www.youtube.com/embed/bT9csxkth8g?autoplay=1&mute=1"
        }
    ]

    Anime.deleteMany({})
    .then((data) => {
        Anime.create(startAnime)
        .then((data) => {
            console.log(data)
            res.json(data)
        })
    })
})

//  Test route
app.get("/", (req, res) => {
    res.render("anime/index.liquid")
})

// Register Anime Router 
app.use("/anime", AnimeRouter)

//////////////////////
// Set up listener
/////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))