const User = require ('../models/user')
const ErrorHandler  = require('../utils/errorHandler')
const CatchAsyncErrors= require('../middlewares/catchAsyncErrors')
const asyncHandler = require('express-async-handler')
const jwt  = require('jsonwebtoken')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const cloudinary = require('cloudinary').v2;






//create a new user /api/v1/register

exports.registerUser =  asyncHandler(async(req, res, next) =>{

    //upload profile image
    const results = await  cloudinary.uploader.upload(req.body.avatar, {
        folder:'avatars',
        width:150,
        Crop:'scaler'
    })
  
    const {name, email, password} = req.body


        const user = await User.create({
            name,
            email,
            password,
            avatar:{
                "public_id": results.public_id,
                "url": results.secure_url
            }
        })
        sendToken(user, 200, res)
    



})


 
//login the registered user

exports.loginUser =  CatchAsyncErrors(async(req, res, next) =>{
   
    const {email, password} = req.body
    console.log(email, password)

    //checks for email and password
    if(!email || !password){
        return next(new ErrorHandler('Please enter your email or password', 400))
    }

    //checks if the email exist
    const user = await User.findOne({email}).select('+password')

    if(!user){
        return next(new ErrorHandler('user with that email not found', 401))

    }


    //check to see if password is correct

    const isPasswordCorrect = await user.comparePassword(password)

    if(!isPasswordCorrect){
        return next(new ErrorHandler('Please enter the correct password', 401))

    }
 
    sendToken(user, 200, res)

    


})



exports.forgotPassword =  CatchAsyncErrors(async(req, res, next) =>{

    const {email} = req.body
        //checks if user with that email exist
const user = await User.findOne({email})

if(!user){
    return next(new ErrorHandler('user with that email not found', 401))
}
    //get reset token if the user exist

    const resetToken = user.generateResetPasswordToken()

    
    await user.save({validateBeforeSave:false})

    //create a password url
    //req.protocol}://${req.get('host')}api/v1/
    // Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;
    console.log(resetUrl)

    const message = `Your password reset token is as follows :\n\n${resetUrl}\n\nIf you have not requested this email then ignore it`

    try{
        await sendEmail({
            email:user.email,
            subject: 'Tech shop Recovery password',
            message 
        })

        //res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains;preload')

        res.status(200).json({
            success:true,
            message:`Email sent to:${user.email}`
        })
    }catch(error){

        //checks if you have errors in your coded
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire=  undefined;
        console.log(error)
        await user.save({validateBeforeSave:false})
        return next(new ErrorHandler(error.message, 500))

    }
}
)

//Reset Password /api/v1/password/reset/:token

exports.resetPassword =  CatchAsyncErrors(async(req, res, next) =>{



    //hash url token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    })



    if(!user){
        return next(new ErrorHandler('Password reset token is invalid or has expired', 400))
    }



    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Passwords do not match', 400))
    }

    //set up a new password
    user.password = req.body.password
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save()

    sendToken(user, 200, res)
})


//update password
exports.updatePassword =  catchAsyncErrors(async(req,res, next) => {
    const user  = await User.findById(req.user.id).select('+password')

    //check if previous password matches to password
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if(!isMatched){
        return next(new  ErrorHandler('old password is incorrect') )
    }

    user.password = req.body.newPassword
    await user.save()
    sendToken(user, 200, res)
})


//update profile
exports.updateProfile =  catchAsyncErrors(async(req,res, next) => {

    const newProfileData ={
        name:req.body.name,
        email:req.body.email,
    }

    //update avatar
    if(req.body.avatar !== ""){
        const user = await User.findById(req.user.id)
        console.log(user)
        const image_id = user.avatar[0].public_id;

        const res = await cloudinary.uploader.destroy(image_id)
        const results = await  cloudinary.uploader.upload(req.body.avatar, {
            folder:'avatars',
            width:150,
            Crop:'scaler'
        })

        newProfileData.avatar={
            "public_id": results.public_id,
            "url": results.secure_url
        }
    
    
    }


    
    const user  = await User.findByIdAndUpdate(req.user.id, newProfileData, {
        new:true,
        runValidators:true,
        useFindAndModify:false
    })


    res.status(200).json({
        success:true,
    user
    })

    
})

exports.logOutUser =  CatchAsyncErrors(async(req, res, next) =>{
   
    res.cookie('token', null, {
        //this will expire the stored cookie 
        expires:new Date(Date.now()),
        httpOnly:true,
    })

    res.status(200).json({
        success:true,
        message:'logged out'
    })


})






//get details of logged in user

exports.getUserProfile =  CatchAsyncErrors(async(req, res, next) =>{
    const {id} = req.user
    const user = await   User.findById(id)

    res.status(200).json({
        success:true,
        user
    
    })


    


})





// Admin Routes

// Get all users   =>   /api/v1/admin/users
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    console.log(users)
    res.status(200).json({
        success: true,
        users
    })
})


exports.getUserById =  CatchAsyncErrors(async(req, res, next) =>{
    const id = req.params.id
    console.log(id)
    const user = await   User.findById(id)

    if(!user){
        return next(new ErrorHandler('user with that id not found', 401))

    }

    res.status(200).json({
        success:true,
        user
    
    })

})


exports.updateUser = CatchAsyncErrors(async(req, res, next) =>{
    const id = req.params.id
    

        const user = await User.findById(id)

        if(!user){
                      return next(new ErrorHandler('user with that id not found', 404))
        }

        const newUserData ={
            name:req.body.name,
            email:req.body.email,
            role:req.body.role
        }

        const UserToUpdate = await User.findByIdAndUpdate(id, newUserData ,{

            new:true,
            runValidators:true,
            useFindAndModify:false,
        })
        res.status(200).json({
            success:true,
            message:'This will update the user',
            UserToUpdate
        
        })

   


})


exports.deleteUser = asyncHandler(async(req, res, next) =>{
    const id = req.params.id
    
    console.log(id)


        const user = await User.findById(id)

        if(!user){
                      return next(new ErrorHandler('user with that id not found', 404))
        }
        const UserToDelete = await User.findByIdAndDelete(id)
        res.status(200).json({
            success:true,
            message:'user deleted successfully',
          
        
        })

   


})