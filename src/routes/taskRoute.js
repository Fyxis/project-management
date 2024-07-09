const express = require('express')
const multer = require('multer')

const taskController = require('../controllers/taskController')

const formBody = multer().array()
const router = express.Router()

router.get('/task', taskController.getAllTask)
router.get('/task/:id_project', taskController.getTaskByIdProject)
router.get('/task/user/:id_user', taskController.getTaskByIdUser)
router.post('/task/:id_user', formBody, taskController.createTaskByIdUser)

module.exports = router