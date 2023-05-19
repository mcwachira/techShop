const ErrorHandler  = require('../utils/errorHandler')
const CatchAsyncErrors= require('../middlewares/catchAsyncErrors')
const asyncHandler = require('express-async-handler')


const stripe =require('stripe')(process.env.STRIPE_SECRET_KEY)

// process stripe payment  /api/v1/payment/process

exports.processPayment  = CatchAsyncErrors(async (req, res, next) => {

    const paymentIntent = await stripe.paymentIntents.create({

        amount:req.body.amount,
        currency:'usd',

        metadata:{
            intergration_check:'accept_a_payment'
        }

    })

    res.status(200).json({
        success:true,
        client_secret:paymentIntent.client_secret
    })


})




// send api key top frontend  /api/v1/stipe/key
exports.sendStripeApi  = CatchAsyncErrors(async (req, res, next) => {

    res.status(200).json({
        success:true,
       stripeApiKey:process.env.STRIPE_PUBLISHABLE_KEY
    })


})


console.log(process.env.STRIPE_PUBLISHABLE_KEY)
