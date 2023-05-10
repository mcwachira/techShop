const express = require('express')
const {registerUser,loginUser, logOutUser,forgotPassword, updateUser, deleteUser, resetPassword} = require('../controllers/authController')
const router = express.Router()



router.route('/user/register').post(registerUser)
router.route('/user/login').get(loginUser)
router.route('/user/logout').get(logOutUser)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/admin/user/:id').put(updateUser)
router.route('/admin/user/:id').delete(deleteUser)


module.exports = router