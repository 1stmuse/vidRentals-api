const router = require('express').Router()
const userRoutes = require('./userRoutes')

router.use('/auth', userRoutes)
module.exports = router