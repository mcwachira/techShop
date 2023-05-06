const express = require('express')
const { getProduct } = require('../controllers/productController')
const router = express.Router()


router.route('/products').get(getProduct)
router.route('/product/new').post(newProduct)

module.exports = router