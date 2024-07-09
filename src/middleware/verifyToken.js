const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.headers.token

    if(!token) return res.status(401).json({ status: 401, message: "UNAUTHORIZED: No Token Provided" })

    jwt.verify(token, process.env.API_KEY, (error, decoded) => {
        if(error) return res.status(401).json({ status: 401, message: "UNAUTHORIZED: Invalid Token" })
        req.data = decoded.data
        next()
    })
}

module.exports = verifyToken