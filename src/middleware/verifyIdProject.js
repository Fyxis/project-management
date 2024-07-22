const utilityModel = require('../models/utilityModel')

const verifyIdProject = async (req, res, next) => {
    const { id_project } = req.params
    try {
        const [dataId] = await utilityModel.verifyIdProject(id_project)
        if(dataId.length == 0) {
            return res.status(404).json({
                status: 404,
                message: `ID PROJECT NOT FOUND`
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: `SERVER ERROR`,
            messageServer: error
        })
    }
}

module.exports = verifyIdProject