import {app} from "./server.js";
import play from "./playwright.js";


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get("/play", play);