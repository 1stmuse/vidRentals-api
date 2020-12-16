const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('config')

const auth = require('./routes/auth')
const customers = require('./routes/customers.js')
const genres = require('./routes/genres.js')
const movies = require('./routes/movie')
const rentals = require('./routes/rentals')
const users = require('./routes/users')
const app = express()

require('dotenv').config()

if(!config.get('jwtPrivateKey')){
    console.error('jwtkey not defined')
    process.exit(1)
}


// app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost/movie-rentals', {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
})
    .then(()=> console.log('DB Connected'))
    .catch(err=> console.log('error connecting', err))
    
mongoose.Promise = global.Promise

app.use('/api/genres',genres)
app.use('/api/customers', customers)
app.use('/api/movies', movies)
app.use('/api/rentals', rentals)
app.use('/api/users', users)
app.use('/api/auth', auth)

// app.use((req,res, next)=>{
//     const error = new Error("Not Found")
//     error.status = 404
//     next(error)

// })
// app.use((error,req,res,next)=>{
//     res.status(error.status || 500)
//     res.json({
//         error:{
//             error:true,
//             message: error.message
//         }
//     })
// })

const port = process.env.PORT || 8080

app.listen(port, ()=>{
    console.log('server running')
})
