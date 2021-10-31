/////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////

const express = require("express")

const Anime = require("../models/anime")
const FAVS = require("../models/favorites")


/////////////////////////////////////
// Create Router
////////////////////////////////////

// Declare router
const routerf = express.Router()

///////////////////////////////////
// Router Middleware
//////////////////////////////////

router.use((req, res, next) => {
    // check if logged in 
      if (req.session.loggedIn){
        // send to routes
        next()
      } else {
        res.redirect("/user/login")
      }
  })

////////////////////
// Routes
/////////////////////

// Index Route
routerf.get("/", (req, res) => {
    FAVS.find({username: req.session.username})
    .then((animes) => {
        res.render("favorites/index.liquid", {animes})
    })
     // error handeling
     .catch((error) => {
        res.json((error))
    })
})

// New Route 
routerf.get("/new", (req, res) => {
    res.render("anime/new.liquid")
})

// Create Route
router.post("/favorites", (req, res) => {
     // add the username to req.body to track user
     req.body.username = req.session.username
     
    FAVS.create(req.body)
    .then((animes) => {
        res.redirect("/anime")
    })
      // error handeling
      .catch((error) => {
        res.json((error))
    })
})

// Edit Route
router.get("/:id/edit", (req, res) => {
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
routerf.put("/:id", (req, res) => {
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
routerf.delete("/:id", (req, res) => {
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
routerf.get("/:id", (req, res) => {
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

//////////////////////////////////
// Export the router
/////////////////////////////////

module.exports = routerf