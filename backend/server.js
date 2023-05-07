const app =  require('./app')


const Port = process.env.PORT 
app.listen(Port, () => {
    console.log(`server started on port ${Port}`)
}) 