const multer = require('multer')
const moment = require('moment')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/photo/project/original')
    },
    filename: (req, file, cb) => {
        const { project_name } = req.body
        const fileName = moment().format('YYYYMMDDHHmmss')
        const fileExtension = path.extname(file.originalname)
        const resultFileName = `${project_name} - ${fileName}${fileExtension}`
        cb(null, resultFileName)
    }
})

module.exports = multer({ storage })