const Joi = require('joi')
const mongoose= require('mongoose')
const Schema = mongoose.Schema


const genreSchema = new Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    }
})

function validateGenre(genre) {
    const schema =Joi.object({
        name: Joi.string().min(5).max(50).required(),
    })

    return schema.validate(genre)
}

const Genre = mongoose.model('genres', genreSchema)

exports.genreSchema = genreSchema
exports.Genre = Genre
exports.validate = validateGenre