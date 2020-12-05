const router = require('express').Router()
const { SIGNUP,LOGIN} = require('../controllers/userController')

router.post('/users/login', LOGIN)
router.post('/users/signup', SIGNUP)
module.exports = router