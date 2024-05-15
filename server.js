const express = require("express");
const cors = require("cors");

const app = express()
const port = 8000;


app.use(cors({origin: "*"}));
app.use(express.json({limit: "5000mb"}));
app.use(express.urlencoded({limit: "5000mb"}));


app.use('/libraries', express.static('libraries'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = {app};