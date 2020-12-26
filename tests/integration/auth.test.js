const request = require('supertest')
const { Genre } = require('../../models/genres')
const {User} = require('../../models/users')

let server

describe('auth middlesware', ()=>{
    let token

    beforeEach(()=>{
        server = require('../../index')
        token = new User().generateAuthToken()
    })
    afterEach(async () => {
        await Genre.remove({})
        server.close()
    })


    const apiCall = ()=>{
        return request(server).post('/api/genres').set('x-auth-token', token).send({name:'genre1'})
    }

    it('should return 401 if no token is provided', async ()=>{

        token = ''

        const res = await apiCall()
        
        expect(res.status).toBe(401)
    })

    it('should return 400 if token is invalid', async ()=>{

        token = 'svyshjss67dsjfhsd63'

        const res = await apiCall()
        
        expect(res.status).toBe(400)
    })

    it('should return 200 if token is valid', async ()=>{

        // token = ''

        const res = await apiCall()
        
        expect(res.status).toBe(200)
    })
})