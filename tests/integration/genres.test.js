const request = require('supertest')
const { Genre } = require('../../models/genres')
const {User} = require('../../models/users')
const mongoose = require('mongoose')

let server

describe('/api/genres', () => {
    beforeEach(() => { server = require('../../index') })
    afterEach(async () => {
        server.close()
        await Genre.remove({})
    })

    describe('GET /', ()=>{
        it('should return all genres', async ()=>{
            await Genre.collection.insertMany([
                {name: 'genre1'},
                {name:'genre2'}
            ])
            const res = await request(server).get('/api/genres')
            expect(res.status).toBe(200)
            expect(res.body.length).toBe(2)
            expect(res.body.some(g=>g.name === 'genre1')).toBeTruthy()
            expect(res.body.some(g=>g.name === 'genre2')).toBeTruthy()
        })
    })

    describe('Get /:id', () => {
        it('should return 404 error is wrong id supplied', async ()=>{
            // const genre = new Genre({name:'genre!'})
            // await genre.save()

            const res = await request(server).get('/api/genres/5fda7a63d44dc729f36')
            expect(res.status).toBe(404)
        })

        it('should return 404 if no genre with the given id is provided', async ()=>{
            // const genre = new Genre({name:'genre!'})
            // await genre.save()
            const id = mongoose.Types.ObjectId()

            const res = await request(server).get(`/api/genres/${id}`)
            expect(res.status).toBe(404)
        })

        it('should return a genre object with given id', async () => {

            // await Genre.collection.insertMany([
            //     {name: 'genre1', _id: new mongoose.Types.ObjectId('5fe1ec2f19833628506d495a')},
            //     {name:'genre2', _id: new mongoose.Types.ObjectId().toHexString()}
            // ])

            // or a better way
            const genre = new Genre({name:'genre1'})
            await genre.save()

            const res = await request(server).get(`/api/genres/${genre._id}`)
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('name', genre.name)
        })
    })

    describe('POST /', ()=>{
        // initialise commonly used variable
        let token
        let name 

        const apiCall = async ()=>{
            return await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({name})
        }

        beforeEach(()=>{
            token = new User().generateAuthToken()
        })
        afterEach(()=>server.close())

        it('should return 401 if client is not logged it', async ()=>{
           token = ''

            res = await apiCall()
            expect(res.status).toBe(401)
        })

        it('should return 400 if genre is less than 5 characters', async ()=>{

            name = 'jon'

            const res = await apiCall()
            expect(res.status).toBe(400)
        })

        it('should return 400 if genre is more than 50 characters', async ()=>{
            name = new Array(52).join('a')

            const res = await apiCall()
            expect(res.status).toBe(400)
        })

        it('should should save the genre if it is valid', async ()=>{

            name = 'genre1'
            await apiCall()

            const genre = await User.find({name:'genre1'})
            expect(genre).not.toBeNull()
        })

        it('should return the genre if it is valid', async()=>{
            // no need for token because it has been set in beforeEach test
             name = 'genre1'
 

            const res = await apiCall()

            expect(res.body).toHaveProperty('_id')
            expect(res.body).toHaveProperty('name', 'genre1')
        })
    })
})