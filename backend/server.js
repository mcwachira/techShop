const app =  require('./app')
require('dotenv').config()


const Port = 8000 || PROCESS.ENV.PORT 
app.listen(Port, () => {
    console.log(`server started on port ${Port}`)
}) 