require('dotenv').config()
const cors = require('cors')
const express =  require('express')

const authRoute = require('./routes/authRoute')

const PORT = process.env.SERVER_PORT
const BASE_URL = process.env.BASE_URL

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    optionsSuccessStatus: 200,
}))
app.use('/asset', express.static('public'))

app.use("/", authRoute)

app.listen(PORT, console.info("SERVER RUNNING AT", BASE_URL))