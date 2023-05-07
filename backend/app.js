const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv')
const connectDb = require('./config/db')
const errorMiddlware = require('./middlewares/error')


//handle uncaught exceptions
process.on('UncaughtExceptions', error => {
    console.log(`error is ${error}`)
    console.log('shutting down server due to unhandled promise rejection')
 
        process.exit(1)
    })


//set up dotenv file
dotenv.config({path:'backend/config/config.env'})



const app = express()


//connect our database
connectDb()

// for parsing application/json
app.use(express.json({ limit: "30mb", extended: true }))
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ limit: "30mb", extended: true }))

//enabling helmet
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))

//enabling cors
app.use(cors())

//enables us to se logs in our terminal
app.use(morgan('tiny')) //used to log request from the frontend
//get cookies
app.use(cookieParser())

/*enabling express to locate static files
app.use(express.static('public')) */

//enabling express to locate static files using virtual path /
app.use('/', express.static(path.join(__dirname, '/public')))




//routes

const productRouter = require('./routes/productRoute')

app.use('/api/v1', productRouter)

//middleware to handle errors
app.use(errorMiddlware)

module.exports =  app