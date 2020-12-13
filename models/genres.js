const Joi = require('joi')
const mongoose= require('mongoose')
const Schema = mongoose.Schema


const genre = new Schema({
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

    return schema.validate(customer)
}

const Genre = mongoose.model('genres', genre)

exports.Genre = Genre
exports.validate = validateGenre