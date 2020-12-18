const express = require('express')
const auth = require('../routes/auth')
const error = require('../middlewares/error')
const customers = require('../routes/customers.js')
const genres = require('../routes/genres.js')
const movies = require('../routes/movie')
const rentals = require('../routes/rentals')
const users = require('../routes/users')

module.exports = function(app){
    app.use(express.json())
    app.use('/api/genres',genres)
    app.use('/api/customers', customers)
    app.use('/api/movies', movies)
    app.use('/api/rentals', rentals)
    app.use('/api/users', users)
    app.use('/api/auth', auth)
    app.use(error)
}