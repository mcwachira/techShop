//create and send token and  save it in cookie

const sendToken = (user, statusCode , res) => {

    //create jwt token

    const token = user.generateToken();

    //option for cookie

    const options = {
        expires:new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME *24*60*60*1000),

        //prevent cookie from being accessed by js
        httpOnly:true
    }


    res.status(statusCode).cookie('token', token, options).json({
        success:true,
        user,
        token
    })
}

module.exports = sendToken