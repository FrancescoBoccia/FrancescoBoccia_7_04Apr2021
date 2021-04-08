const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user')

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

router.post('/signup', userCtrl.signUp)

router.post('/login', userCtrl.login)

router.put('/update', auth, multer, userCtrl.updateProfile)

module.exports = router
