const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true

})

server.get("/", function(req, res){
    const about = {
        avatar_url: "https://avatars.githubusercontent.com/u/21069485?s=460&u=2e4e6af285cba177672e6ab6a17a3e5a19d1118a&v=4",
        name: "Leo Gonçalves",
        role: "Estudante de programação",
        description: "Atualmente estudando as tecnologias de desenvolvimento: HTML, CSS, Javascript e React",
        links: [
            { name: "GitHub", url: "https://github.com/LeoSanGo" },
            { name: "Twitter", url: "https://twitter.com/LeoSantGo" },
            { name: "Linkein", url: "https://www.linkedin.com/in/leosangoncalves/" }
        ]
    }

    return res.render("about", { about })
})

server.get("/portifolio", function(req, res){

    return res.render("portifolio", { itens: videos })
})

server.get("/video", function(req, res){
    const id = req.query.id
    const video = videos.find(function(video){
        return video.id == id
        
    })

    if (!video) {
        return res.send("Video not found")
    }

    return res.render("video", { item: video })
})

server.listen(5000, function() {
    console.log('server is running')
})