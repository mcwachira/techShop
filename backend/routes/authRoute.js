const express = require('express')
const {registerUser,loginUser, logOutUser,forgotPassword, updateUser, 
    deleteUser, resetPassword, getUserProfile, updatePassword, updateProfile, getAllUsers, getUserById} = require('../controllers/authController')
const {isAuthenticatedUser, authorizedRoles} = require('../middlewares/auth')
const router = express.Router()



router.route('/user/register').post(registerUser)
router.route('/user/login').post(loginUser)
router.route('/user/logout').get(logOutUser)
router.route('/profile').get(isAuthenticatedUser, getUserProfile )
router.route('/password/update').put(isAuthenticatedUser,  updatePassword)
router.route('/profile/update').put(isAuthenticatedUser,  updateProfile)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)



//admin routes
router.route('/admin/users', isAuthenticatedUser, authorizedRoles('admin')).get(getAllUsers)
router.route('/admin/users/:id', isAuthenticatedUser, authorizedRoles('admin')).get(getUserById)
router.route('/admin/user/update/:id',isAuthenticatedUser, authorizedRoles('admin')).put(updateUser)
router.route('/admin/user/delete/:id',isAuthenticatedUser, authorizedRoles('admin' )).delete(deleteUser)

module.exports = router