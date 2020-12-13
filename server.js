require('dotenv').config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const cors = require("cors")
//import morgan from 'morgan';
const morgan = require('morgan')
const chalk = require('chalk')
const apiRoutes = require("./routes/Api")

const morganMiddleware = morgan(function (tokens, req, res) {
    return [
        //'\n\n\n',
        chalk.hex('#ff4757').bold('🍄  Morgan --> '),
        chalk.hex('#34ace0').bold(tokens.method(req, res)),
        chalk.hex('#ffb142').bold(tokens.status(req, res)),
        chalk.hex('#ff5252').bold(tokens.url(req, res)),
        chalk.hex('#2ed573').bold(tokens['response-time'](req, res) + ' ms'),
        chalk.hex('#f78fb3').bold('@ ' + tokens.date(req, res)),
        chalk.yellow(tokens['remote-addr'](req, res)),
        chalk.hex('#fffa65').bold('from ' + tokens.referrer(req, res)),
        chalk.hex('#1e90ff')(tokens['user-agent'](req, res)),
        //'\n\n\n',
    ].join(' ');
});


const port = process.env.PORT || 1337

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
//app.use(morgan(':remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms'))
//app.use(morgan('dev'))
app.use(morganMiddleware)
// app.use(fileUpload())
app.use(express.static("public"))
app.use("/api/v1", apiRoutes)

/*
Wildcard route for define if request not available
@return Json
*/
app.get("*", (req, res) => {
    res.status(404).json({
        message: "Resource not found",
        status: 404,
        data: {},
        error: false
    })
})


app.listen(port, () => console.log(`Backend started on : ${port}`))
