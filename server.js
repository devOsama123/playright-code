import express from "express";

export const app = express()
const port = 8000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})