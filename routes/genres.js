const router = require('express').Router()
const mongoose = require('mongoose')
const admin = require('../middlewares/admin')
const auth = require('../middlewares/auth')
const validateObjectId = require('../middlewares/validateObjectId')

const {Genre, validate} = require('../models/genres')

router.get('/', async (req,res)=>{
    // throw new Error('testing logger could not get genre')
    const genres = await Genre.find().sort('name')
    res.send(genres)
})

router.post('/', auth, async (req,res)=>{
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const genre =new Genre({name:req.body.name})
    await genre.save()
    res.send(genre)
})



router.put('/:id', async (req,res)=>{

    const {error} = validate(req.body)
    if(error) return res.status(401).send(error.details[0].message)

    const genre = await Genre.findByIdAndUpdate(req.params.id, {name:req.body.name}, {new:true})
    
    if(!genre) return res.status(404).send('The genre with the given ID does not exist')

    res.send(genre)

})

router.delete('/:id', [auth, admin], async (req,res)=>{
    const genre = await Genre.findByIdAndRemove(req.params.id)

    if(!genre) return res.status(404).send('The genre with the given ID does not exist')
    
    res.send(genre)
})

router.get('/:id', validateObjectId, async (req,res)=>{
    
    const genre = await Genre.findById(req.params.id)

    if(!genre) return res.status(404).send('The genre with the given ID does not exist')

    res.send(genre)
})


module.exports = router