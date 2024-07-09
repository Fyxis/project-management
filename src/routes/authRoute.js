const express = require('express')
const multer = require('multer')

const authController = require('../controllers/authController')

const formBody = multer().array()
const uploadImage = require('../middleware/photoStoreProfile')
const router = express.Router()

router.post('/auth/login', formBody, authController.loginAuth)
router.post('/auth/register', uploadImage.array('photo'), authController.registerAuth)

module.exports = router