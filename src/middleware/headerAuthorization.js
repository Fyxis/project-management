const Authorization = (req, res, next) => {
    const bearerToken = req.headers.authorization
    const apiKey = `Bearer ${process.env.AUTHORIZATION}`
    try {
        if(bearerToken == apiKey) {
            next()
        } else {
            return res.status(401).json({
                status: 401,
                message: `UNAUTHORIZED: Invalid Bearer Token`
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: `SERVER ERROR`,
            messageServer: error
        })
    }
}

module.exports = Authorization