const mongoose = require('mongoose')
const colors = require('colors')
require('dotenv').config()

const connectDb = async () => {

    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            name: 'Mern Stack Notes',
        })

        console.log(`MongoDb  connected ${connect.connection.host}`.blue.underline)
    } catch (error) {
        console.log(`error :${error.message}`.red.underline.bold)
        process.exit(1)
    }


}

module.exports =  connectDb