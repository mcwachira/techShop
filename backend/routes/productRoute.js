const express = require('express')
const { getProducts , newProduct,getSingleProduct, updateProduct, deleteProduct} = require('../controllers/productController')
const router = express.Router()


router.route('/products').get(getProducts)
router.route('/product/new').post(newProduct)
router.route('/product/:id').get(getSingleProduct)
router.route('/admin/product/:id').put(updateProduct)
router.route('/admin/product/:id').delete(deleteProduct)


module.exports = router