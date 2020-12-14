const Joi = require('joi')
const mongoose= require('mongoose')
const Schema = mongoose.Schema

const {genreSchema} = require('./genres')

const movie = new Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:5,
        maxlength:255
    },
    numberInStock:{
        type:Number,
        required:true,
        min:0,
        max:255
    },
    dailyRentalRate:{
        type:Number,
        required:true,
        min:0,
        max:255
    },
    genre:{
        type:genreSchema,
        required:true
    }
})

function validateMovie(movie) {
    const schema =Joi.object({
        title: Joi.string().min(5).max(50).required(),
        numberInStock:Joi.number().min(0).required(),
        dailyRentalRate:Joi.number().min(0).required(),
        genreId:Joi.objectId().required()
    })

    return schema.validate(movie)
}

const Movie= mongoose.model('movies', movie)

exports.Movie = Movie
exports.validate = validateMovie