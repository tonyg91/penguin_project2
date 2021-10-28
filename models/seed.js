/////////////////////////////
// Import Dependencies
////////////////////////////

const mongoose = require("./connections")
const Anime = require("./anime")

//////////////////////////////
// Seed Routes
/////////////////////////////
const db = mongoose.connection

// Inital seed route
db.on("open", () => {
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
            console.log(data)
            db.close()
        })
    })
})