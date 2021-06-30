const { NotAuthorized } = require('../helpers/errors')
const jwt = require('jsonwebtoken')
const { User } = require('../db/userModel')

const authMiddleware = async (req, res, next) => {
  const [, token] = req.headers.authorization.split(' ')
  if (!token) {
    next(new NotAuthorized('please provide a token'))
  }
  try {
    const user = jwt.decode(token, process.env.JWT_SECRET)
    req.user = user
    req.token = token
    next()
    const userExist = await User.findOne({ _id: user.id, token })

    if (!userExist) {
      next(new NotAuthorized('Not authorized'))
    }
    next()
  } catch (err) {
    next(new NotAuthorized('Invalid token'))
  }
}
module.exports = {
  authMiddleware
}
