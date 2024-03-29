const express = require('express')
const router = express.Router()

const {isAuthenticatedUser, authorizedRoles} = require('../middlewares/auth')
const { newOrder, getSingleOrder, updateOrder, deleteOrder, allOrders, myOrders } = require('../controllers/orderController')

//router.route('/order').get(isAuthenticatedUser,  getOrder)
router.route('/order/new').post(isAuthenticatedUser, newOrder)
router.route('/orders/me').get(isAuthenticatedUser, myOrders);
router.route('/admin/orders').get(isAuthenticatedUser, authorizedRoles('admin'),allOrders)
router.route('/orders/:id').get(getSingleOrder)
 router.route('/admin/order/:id').put(isAuthenticatedUser, authorizedRoles('admin'), updateOrder)
 router.route('/admin/order/:id').delete(isAuthenticatedUser, authorizedRoles('admin'), deleteOrder)


module.exports = router