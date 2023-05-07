 const ErrorHandler = require('../utils/errorHandler')

 module.exports=(err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal server error';


    //separate errors in dev mode and in production mode
    if(process.env.NODE_EV === 'development'){
        res.status(err.statusCode).json({
            success:false,
            err:err,
            errMessage:err.message,
            stack:err.stack
        })
    
    }


    if(process.env.NODE_EV === 'production'){
        let error = {...err}

        error.message = err.message

        //handle mongoose id error
        if(error.message === 'CastError' ){
            const message = `resource not found invalid . invalid ${err.path}`
            error = new ErrorHandler(message, 400)
        }

        //handle Mongoose validation error
        if(error.message === 'ValidationError'){
            const message = Object.values((err.errors).map(value => value.message))
            error = new ErrorHandler(message, 400)
        }

        res.status(error.statusCode).json({
            success:false,
            message:error.message || 'Internal server error'   
        
        })

    }
 

 }