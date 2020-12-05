const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 8080
require('dotenv').config()


app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=> console.log('DB Connected'))
    .catch(err=> console.log('error connecting', err))
    
mongoose.Promise = global.Promise

const routes = require('./routes')
app.use('/api-v1',routes)

app.use((req,res, next)=>{
    const error = new Error("Not Found")
    error.status = 404
    next(error)

})
app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        error:{
            error:true,
            message: error.message
        }
    })
})
app.listen(port, ()=>{
    console.log('server running')
})
