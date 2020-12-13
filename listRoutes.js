require('dotenv').config()
const listEndpoints = require('express-list-endpoints')
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const cors = require("cors")
const apiRoutes = require("./routes/Api")

const port = process.env.PORT || 1337

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
// app.use(fileUpload())
app.use(express.static("public"))
app.use("/api/v1", apiRoutes)

/*
Wildcard route for define if request not available
@return Json
*/
app.get("*", (req, res) => {
    res.json({
        message: "Resource not found",
        status: 404,
        data: {},
        error: false
    })
})

console.log(listEndpoints(app));