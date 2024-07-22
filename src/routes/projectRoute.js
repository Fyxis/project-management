const express = require('express')
const multer = require('multer')

const projectController = require('../controllers/projectController')

const formBody = multer().array()
const uploadImage = require('../middleware/photoStoreProject')
const verifyIdUser = require('../middleware/verifyIdUser')
const verifyIdProject = require('../middleware/verifyIdProject')
const router = express.Router()

router.get('/project', projectController.getAllProject)
router.get('/project/:id_project', verifyIdProject, projectController.getProjectByIdProject)
router.get('/project/user/:id_user', verifyIdUser, projectController.getAllProjectByIdUser)
router.post('/project/:id_user', verifyIdUser, uploadImage.array('photo'), projectController.createProjectByIdUser)

module.exports = router