const express = require('express')
const connectDb = require('./config/db')
const app = express()

connectDb()



//routes

const productRouter = require('./routes/productRoute')

app.use('/products', productRouter)

module.exports =  app