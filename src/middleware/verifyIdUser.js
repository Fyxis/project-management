const utilityModel = require('../models/utilityModel')

const verifyIdUser = async (req, res, next) => {
    const { id_user } = req.params
    try {
        const [dataId] = await utilityModel.verifyIdUser(id_user)
        if(dataId.length == 0) {
            return res.status(404).json({
                status: 404,
                message: `ID USER NOT FOUND`
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

module.exports = verifyIdUser