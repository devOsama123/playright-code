const {app} = require("./server.js");
const play = require("./playwright.js");
const {createMediaChrome} = require("./videoController.js");


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get("/play", play);

app.post("/generateVideo1/chrome/async:id", createMediaChrome);