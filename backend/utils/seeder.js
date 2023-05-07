const products = require('../data/product')
const Product = require('../models/product')

const dotenv = require('dotenv')

//set up dotenv file
dotenv.config({path:'backend/config/config.env'})
const connectDb = require('../config/db')


connectDb()
const seedProducts = async() =>{
     try{
        await Product.deleteMany()
        console.log('products are deleted')

        await Product.insertMany(products)
        console.log('products are inserted')

     }catch(error){

        console.log('error', error)
process.exit()

     }

    }

    seedProducts()