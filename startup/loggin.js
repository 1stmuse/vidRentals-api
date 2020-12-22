const winston = require('winston')
// require('winston-mongodb')
require('express-async-errors')

module.exports = function(){
// to handles errors not related to express
winston.handleExceptions(
    new winston.transports.Console({colorize:true, prettyPrint:true}),
    new winston.transports.File({filename:'uncaughtExceptions.log'})
)

// to catch async errors not releted to express
process.on('unhandledRejection', (ex)=>{
    // we can throw error so winston catches it for us
    throw ex
})

winston.add(winston.transports.File, {filename:'logfile.log'})
// winston.add(winston.transports.MongoDB, {db: 'mongodb://localhost/movie-rentals'})

}