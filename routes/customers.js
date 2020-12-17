const router = require('express').Router()
const {Customer, validate} = require('../models/customer')


router.get('/', async (req,res)=>{
    const customers = await Customer.find().sort('name')

    res.send(customers)
})

router.post('/', async (req,res)=>{
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const customer =new Customer({
        name:req.body.name,
        phone:req.body.phone,
        isGold: req.body.isGold
    })
    await customer.save()
    res.send(customer)
})

router.put('/:id', async (req,res)=>{

    const {error} = validate(req.body)
    if(error) return res.status(401).send(error.details[0].message)

    const genre = await Customer.findByIdAndUpdate(req.params.id, {name:req.body.name}, {new:true})
    
    if(!genre) return res.status(404).send('The genre with the given ID does not exist')

    res.send(genre)

})

router.delete('/:id', async (req,res)=>{
    const genre = Customer.findByIdAndRemove(req.params.id)

    if(!genre) return res.status(404).send('The genre with the given ID does not exist')
    
    res.send(genre)
})

router.get('/:id', async (req,res)=>{
    const genre = await Customer.findById(req.params.id)

    if(!genre) return res.status(404).send('The genre with the given ID does not exist')

    res.send(genre)
})

module.exports = router