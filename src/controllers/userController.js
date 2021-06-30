
const {
  login,
  registration,
  logout
} = require('../service/authService')

const registrationController = async (req, res, next) => {
  const { email, password } = req.body
  await registration({ email, password })
  res.status(200).json({ status: 'success' })
}
const loginController = async (req, res, next) => {
  const { email, password } = req.body
  const token = await login({ email, password })
  res.status(200).json({ token })
}
const logoutController = async (req, res) => {
  const { id } = req.user
  const token = req.token
  await logout({
    id,
    token
  })

  res.status(204).json({})
}
module.exports = {
  registrationController,
  loginController,
  logoutController
}
