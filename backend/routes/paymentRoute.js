const express = require('express')
const router = express.Router()

const {isAuthenticatedUser, authorizedRoles} = require('../middlewares/auth')
const { processPayment, sendStripeApi } = require('../controllers/paymentController')

//router.route('/order').get(isAuthenticatedUser,  getOrder)
router.route('/payment/process').post(isAuthenticatedUser,processPayment)
router.route('/stripe-key').get(isAuthenticatedUser,sendStripeApi)



module.exports = router