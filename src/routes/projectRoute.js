const express = require('express')
const multer = require('multer')

const projectController = require('../controllers/projectController')

const formBody = multer().array()
const uploadImage = require('../middleware/photoStoreProject')
const router = express.Router()

router.get('/project', projectController.getAllProject)
router.get('/project/:id_project', projectController.getProjectByIdProject)
router.get('/project/user/:id_user', projectController.getAllProjectByIdUser)
router.post('/project/:id_user', uploadImage.array('photo'), projectController.createProjectByIdUser)

module.exports = router