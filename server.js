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
// User Router
const UserRouter = require("./controllers/user")

const session = require("express-session") // session middleware
const MongoStore = require("connect-mongo") // save sessions in mongo

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

// middleware to create sessions (req.session)
app.use(session({
   secret: process.env.SECRET,
   store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
   resave: false,
   saveUninitialized: true
}))

/////////////////////////////
// Routes
/////////////////////////////


//  Test route
app.get("/", (req, res) => {
   res.render("index.liquid")
})
// user add to home page route attempt one
// app.post("/home/new", (req, res) => {
//     Anime.create(req.body)
//     .then((animes) => {
//         res.redirect("/home")
//     })
//       // error handeling
//       .catch((error) => {
//         res.json((error))
//     })
// })

// Register Anime Router 
app.use("/anime", AnimeRouter)

app.use("/user", UserRouter)

//////////////////////
// Set up listener
/////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))