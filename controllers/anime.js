/////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////

const express = require("express")

const Anime = require("../models/anime")


/////////////////////////////////////
// Create Router
////////////////////////////////////

// Declare router
const router = express.Router()

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
router.get("/", (req, res) => {
    Anime.find({username: req.session.username})
    .then((animes) => {
        res.render("anime/index.liquid", {animes})
    })
     // error handeling
     .catch((error) => {
        res.json((error))
    })
})

// New Route 
router.get("/new", (req, res) => {
    res.render("anime/new.liquid")
})

// Create Route
router.post("/", (req, res) => {
     // add the username to req.body to track user
     req.body.username = req.session.username
     
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
router.put("/:id", (req, res) => {
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

// User Route 
router.get("/user", (req, res) => {
    Anime.find({username: req.session.username})
    .then((animes) => {
        res.render("anime/user.liquid", {animes})
    })
     // error handeling
     .catch((error) => {
        res.json((error))
    })
})

// Create Route
router.post("/user", (req, res) => {
    // add the username to req.body to track user
    req.body.username = req.session.username
    
   Anime.create(req.body)
   .then((animes) => {
       res.redirect("/anime/user")
   })
     // error handeling
     .catch((error) => {
       res.json((error))
   })
})

// Delete Route 
router.delete("/:id", (req, res) => {
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
router.get("/:id", (req, res) => {
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

module.exports = router 