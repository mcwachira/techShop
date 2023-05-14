const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv')
const connectDb = require('./config/db')
const errorMiddlware = require('./middlewares/error')
const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload')


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


// Configuration 
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
  });
  

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

//upload files
app.use(fileUpload())




//routes

const productRouter = require('./routes/productRoute')
const authRouter = require('./routes/authRoute')
const orderRouter = require('./routes/orderRoute')

app.use('/api/v1', productRouter)
app.use('/api/v1', authRouter)
app.use('/api/v1', orderRouter)

//middleware to handle errors
app.use(errorMiddlware)

module.exports =  app