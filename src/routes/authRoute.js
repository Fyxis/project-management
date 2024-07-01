const express = require('express')
const multer = require('multer')

const authController = require('../controllers/authController')

const formBody = multer().array()

const router = express.Router()

router.post('/auth/login', formBody, authController.loginAuth)
router.post('/auth/register', formBody, authController.registerAuth)

module.exports = router