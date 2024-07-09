require('dotenv').config()
const cors = require('cors')
const express =  require('express')

const authRoute = require('./routes/authRoute')
const projectRoute = require('./routes/projectRoute')
const taskRoute = require('./routes/taskRoute')

const Authorization = require('./middleware/headerAuthorization')
const verifyToken = require('./middleware/verifyToken')

const PORT = process.env.SERVER_PORT
const BASE_URL = process.env.BASE_URL

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    optionsSuccessStatus: 200,
}))
app.use('/management/public', express.static('public'))

app.use("/management", Authorization, authRoute)
app.use("/management", Authorization, verifyToken, projectRoute)
app.use("/management", Authorization, verifyToken, taskRoute)

app.listen(PORT, console.info("SERVER RUNNING AT", BASE_URL))