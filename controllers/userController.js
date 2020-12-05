const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Users = require('../models/userModel')
require('dotenv').config()


exports.SIGNUP = async (req, res, next) =>{
    const user = await Users.findOne({email: req.body.email})
    if(user){
        const error = new Error('user already exist')
        error.status = 401
        next(error)
        return
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10)
    req.body.password = hashPassword
    try {
        newUser = new Users(req.body)
        await newUser.save()
        res.status(200).json({success:true})
    } catch (err) {
        const error = new Error(err)
        error.status = 401
        next(error)
        return
        
    }
}

exports.LOGIN = async(req,res,next)=>{
    let userCredentials ={
        email:req.body.email,
        password:req.body.password
    }

    try {
        const user = await Users.findOne({email:userCredentials.email})
        if(!user){
            const error = new Error('email or password incorrect')
            error.status = 400
            next(error)
            return
        }
        const validPassword = await bcrypt.compare(userCredentials.password, user.password)
        if(!validPassword){
            const error = new Error('email or password incorrect')
            error.status = 400
            next(error)
            return
        }

        const token = jwt.sign(user._id.toHexString(),process.env.TOKEN_SECRET)
        res.status(200).json({
            success:true,
            token
        })
    } catch (err) {
        const error = new Error(err.message)
        error.status = 400
        next(error)
        return
    }
}
