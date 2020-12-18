const winston = require('winston')
const mongoose = require('mongoose')

module.exports = function(){
    mongoose.connect('mongodb://localhost/movie-rentals', {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
})
    .then(()=> winston.info('Connected to mongoDB'))
    
    mongoose.Promise = global.Promise
}