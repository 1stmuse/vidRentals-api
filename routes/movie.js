const router = require('express').Router()
const {Genre} = require('../models/genres')
const {Movie, validate} = require('../models/movies')

router.get('/', async (req,res)=>{
    const movies = await Movie.find()
    res.send(movies)
})

router.get('/:id', async (req, res)=>{
    const movie = await Movie.findById(req.params.id)
    res.send(movie)
})

router.post('/', async (req, res)=>{
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findById(req.body.genreId)
    if(!genre) return res.status(400).send('Invalid genre')

    let movie = new Movie({
        title:req.body.title,
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate,
        genre:{
            _id:genre._id,
            name:genre.name
        }
    })

    movie = await movie.save()
    res.send(movie)
})

module.exports = router