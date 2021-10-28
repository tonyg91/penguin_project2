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

////////////////////
// Routes
/////////////////////

// Index Route
router.get("/", (req, res) => {
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
router.get("/new", (req, res) => {
    res.render("anime/new.liquid")
})

// Create Route
router.post("/", (req, res) => {
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