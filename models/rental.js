const { boolean } = require('joi')
const Joi = require('joi')
const mongoose= require('mongoose')
const Schema = mongoose.Schema


const rental = new Schema({
    customer:{
        type:new Schema({
            name:{
                type:String,
                required:true,
                minlength:5,
                maxlength:50
            },
            isGold:{
                type:boolean,
                default:false
            },
            phone:{
                type:String,
                required:true,
                minlength:5,
                maxlength:50
            }
        }),
        required:true
    },
    movie:{
        type: new Schema({
            title:{
                type:String,
                required:true,
                trim:true,
                minlength:5,
                maxlength:255
            },
            dailyRentalRate:{
                type:Number,
                required:true,
                min:0,
                max:255
            },
        }),
        required:true
    },
    dateOut:{
        type:Date,
        required:true,
        default:Date.now
    },
    dateReturned:{
        type:Date
    },
    rentalFee:{
        type:Number,
        min:0
    }
})

function validateRental(rental) {
    const schema =Joi.object({
        customerId:Joi.string().required(),
        movieId:Joi.string().required()
    })

    return schema.validate(rental)
}

const Rental = mongoose.model('genres', rental)

exports.Rental = Rental
exports.validate = validateRental