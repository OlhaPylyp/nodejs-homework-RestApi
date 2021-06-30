const express = require('express')
const router = express.Router()
const {
  authorizationValidation,
  // subscriptionValidation
} = require('../../middlewares/validation')
const { asyncWrapper } = require('../../helpers/apiHelpers')
const { authMiddleware } = require('../../middlewares/authMiddlware')

const {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController
} = require('../../controllers/userController')

router.post('/registration', authorizationValidation, asyncWrapper(registrationController))
router.post('/login', authorizationValidation, asyncWrapper(loginController))
router.post('/logout', authMiddleware, asyncWrapper(logoutController))
router.get('/current', authMiddleware, asyncWrapper(getCurrentUserController))

module.exports = router
