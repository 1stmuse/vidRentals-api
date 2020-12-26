const { Genre } = require('../../../models/genres')
const {User} = require('../../../models/users')
const jwt = require('jsonwebtoken')
const auth = require('../../../middlewares/auth')
const config = require('config')
const mongoose = require('mongoose')

describe('auth middleware', ()=>{

    // beforeEach(()=>{}) 

    it('should populate req.user with the payload of a valid jwt', async()=>{
        // create a user object
        const user = {_id:mongoose.Types.ObjectId().toHexString(), isAdmin:true}
        const token = new User(user).generateAuthToken()

        // mock a request
        const req = {
            header: jest.fn().mockReturnValue(token)
        }
        // mock a response
        const res ={}
        // mock a next fn
        const next = jest.fn()
        auth(req, res, next)

        expect(req.user).toBeDefined()
        expect(req.user).toMatchObject(user)
    })
})