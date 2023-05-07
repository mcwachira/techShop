const app =  require('./app')


const Port = process.env.PORT 
const server = app.listen(Port, () => {
    console.log(`server started on port ${Port} and in ${process.env.NODE_ENV}`)
}) 

//handle promise rejection

process.on('unhandledRejection',error => {
    console.log(`error is ${error}`)
    console.log('shutting down server due to unhandled promise rejection')
    server.close(() => {
        process.exit(1)
    })

})