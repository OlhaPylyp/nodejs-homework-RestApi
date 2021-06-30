const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../db/userModel')
const { NotAuthorized, RegistrationConflictError } = require('../helpers/errors')

const registration = async ({ email, password }) => {
  const existEmail = User.findOne({ email })
  if (existEmail) { throw new RegistrationConflictError('Email  is already used') }
  const user = new User({
    email,
    password
  })
  const newUser = await user.save()
  return { email: newUser.email, subscription: newUser.subscription }
}
const login = async ({ email, password }) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new NotAuthorized('Email  is wrong')
  }
  console.log('password', password)
  console.log('user.password', user.password)
  if (!await bcrypt.compare(password, user.password)) {
    throw new NotAuthorized('Password is wrong')
  }
  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      subscription: user.subscription
    },
    process.env.JWT_SECRET
  )
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { $set: { token } },
    { new: true }
  )
  return updatedUser
}

const logout = async ({ id, token }) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: id, token },
    { $set: { token: null } },
    { new: true }
  )
  if (!updatedUser) {
    throw new NotAuthorized('Not authorized')
  }
}
module.exports = {
  registration,
  login,
  logout

}
