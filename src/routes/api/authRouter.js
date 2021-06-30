const express = require('express')
const router = express.Router()
const {
  authorizationValidation,
  logoutController
  // subscriptionValidation
} = require('../../middlewares/validation')
const { asyncWrapper } = require('../../helpers/apiHelpers')
const { authMiddleware } = require('../../middlewares/authMiddlware')

const {
  registrationController,
  loginController
} = require('../../controllers/userController')

router.post('/registration', authorizationValidation, asyncWrapper(registrationController))
router.post('/login', authorizationValidation, asyncWrapper(loginController))
router.post('/logout', authMiddleware, asyncWrapper(logoutController))

module.exports = router
