const express = require('express')
const multer = require('multer')

const taskController = require('../controllers/taskController')
const verifyIdUser = require('../middleware/verifyIdUser')
const verifyIdProject = require('../middleware/verifyIdProject')

const formBody = multer().array()
const router = express.Router()

router.get('/task', taskController.getAllTask)
router.get('/task/:id_project', verifyIdProject, taskController.getTaskByIdProject)
router.get('/task/user/:id_user', verifyIdUser, taskController.getTaskByIdUser)
router.post('/task/:id_user', verifyIdUser, formBody, taskController.createTaskByIdUser)

module.exports = router