const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const customers = require('./routes/customers.js')
const genres = require('./routes/genres.js')
const app = express()

require('dotenv').config()


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
