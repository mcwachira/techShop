const express = require('express')
const { getProducts , newProduct,getSingleProduct, updateProduct, deleteProduct, createProductReview, getProductsReviews, deleteProductReview} = require('../controllers/productController')
const router = express.Router()

const {isAuthenticatedUser, authorizedRoles} = require('../middlewares/auth')

router.route('/products').get(getProducts)
router.route('/product/new').post(isAuthenticatedUser,authorizedRoles('admin'), newProduct)
router.route('/product/:id').get(getSingleProduct)
router.route('/admin/product/:id').put(isAuthenticatedUser, authorizedRoles('admin'), updateProduct)
router.route('/admin/product/:id').delete(isAuthenticatedUser, authorizedRoles('admin'), deleteProduct)

//review routes
router.route('/review').put(isAuthenticatedUser, createProductReview)
router.route('/product/reviews').get(isAuthenticatedUser,  getProductsReviews)
router.route('/reviews/delete').delete(isAuthenticatedUser, deleteProductReview)
module.exports = router