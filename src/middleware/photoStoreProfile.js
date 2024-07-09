const multer = require('multer')
const moment = require('moment')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/photo/profile/original')
    },
    filename: (req, file, cb) => {
        const { name } = req.body
        const fileName = moment().format('YYYYMMDDHHmmss')
        const fileExtension = path.extname(file.originalname)
        const resultFileName = `${name} - ${fileName}${fileExtension}`
        cb(null, resultFileName)
    }
})

module.exports = multer({ storage })