const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../db/userModel')
const { NotAuthorized, RegistrationConflictError } = require('../helpers/errors')

const registration = async ({ email, password }) => {
  const existEmail = await User.findOne({ email })
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

const logout = async ({ userId, token }) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: userId, token },
    { $set: { token: null } },
    { new: true }
  )
  if (!updatedUser) {
    throw new NotAuthorized('Not authorized')
  }
}
const getCurrentUser = async ({ userId, token }) => {
  const currentUser = await User.findOne(
    { _id: userId, token },
  )
  console.log('currentUser', currentUser)
  if (!currentUser) {
    throw new NotAuthorized('Not authorized')
  }
  return currentUser
}
module.exports = {
  registration,
  login,
  logout,
  getCurrentUser

}
