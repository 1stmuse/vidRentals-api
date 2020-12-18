const express = require('express')
const winston = require('winston')
const app = express()

require('./startup/loggin')
require('./startup/route')(app)
require('./startup/db')()
require('./startup/config')()
require('./startup/validation')()
// require('dotenv').config()

const port = process.env.PORT || 8080

app.listen(port, ()=>{
    winston.info('server running')
})
