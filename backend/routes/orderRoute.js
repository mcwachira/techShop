const express = require('express')
const router = express.Router()

const {isAuthenticatedUser, authorizedRoles} = require('../middlewares/auth')
const { newOrder, getSingleOrder, updateOrder, deleteOrder, getOrders } = require('../controllers/orderController')

//router.route('/order').get(isAuthenticatedUser,  getOrder)
router.route('/order/new').post(isAuthenticatedUser, newOrder)
router.route('/admin/orders').get(isAuthenticatedUser, authorizedRoles('admin'),getOrders)
router.route('/order/:id').get(getSingleOrder)
 router.route('/admin/order/:id').put(isAuthenticatedUser, authorizedRoles('admin'), updateOrder)
 router.route('/admin/order/:id').delete(isAuthenticatedUser, authorizedRoles('admin'), deleteOrder)


module.exports = router