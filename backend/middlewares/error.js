 const ErrorHandler = require('../utils/errorHandler')

 module.exports=(err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal server error';


    //separate errors in dev mode and in production mode
    if(process.env.NODE_ENV === 'development'){
        res.status(err.statusCode).json({
            success:false,
            err:err,
            errMessage:err.message,
            stack:err.stack
        })
    
    }


    if(process.env.NODE_ENV === 'production'){
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

        
    //handling error duplication in production mode

    if(error.code === 110000){
        const message = `Duplicate ${aObject.keys(err.keyValue)} entered`
        error = new ErrorHandler(message, 400)
    }


    //handling wrong jwt error
    if(error.code === 'JsonWebTokenError'){
        const message = 'Json web token is invalid pleaser try again'
        error = new ErrorHandler(message, 400)
    }


        //handling EExpired jwt error
        if(error.code === 'TokenExpiredError'){
            const message = 'Json web token is Expired . Try again '
            error = new ErrorHandler(message, 400)
        }

        res.status(error.statusCode).json({
            success:false,
            message:error.message || 'Internal server error'   
        
        })

    }
 

 }