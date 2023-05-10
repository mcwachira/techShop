const expressAsyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require('jsonwebtoken');
const User = require("../models/user");

//check if user is authenticated

exports.isAuthenticatedUser = expressAsyncHandler(async(req, res, next) => {

const {token} = req.cookies

if(!token){
return next(new ErrorHandler('Please login first to access the resource', 401))
}

const decoded = jwt.verify(token, process.env.JWT_SECRET)


req.user = await User.findById(decoded.id)

next()
})


///handling user roles
exports.authorizedRoles =(...roles) => {

    return(req, res, next) =>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access that resource`), 403)
        }
        next()
    }

    }
    