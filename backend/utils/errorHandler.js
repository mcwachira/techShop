//error handler class

class ErrorHandler extends Error {
    //message - error message
    //status code - http status codes
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode


        //takes in the object itself and the constructor function
        
        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = ErrorHandler