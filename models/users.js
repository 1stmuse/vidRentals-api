const config = require('config')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const mongoose= require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type:String,
        minlength:3,
        maxlength:50,
        required:true
    },
    email:{
        type:String,
        minlength:5,
        maxlength:255,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:1024,
    }
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id}, config.get('jwtPrivateKey'))
    return token
}

function validateUser(user) {
    const schema =Joi.object({
        name:Joi.string().min(3).max(50).required(),
        email:Joi.string().required().email(),
        password:Joi.string().min(5).max(255).required()
    })

    return schema.validate(user)
}

const User = mongoose.model('users', userSchema)

exports.User = User
exports.validate = validateUser