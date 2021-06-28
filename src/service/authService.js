const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../db/userModel')
const { NotAuthorized } = require('../helpers/errors')


const registration = async ({ email, password }) => {
  const newUser = new User({ email, password })
  return await newUser.save()
}
const login = async ({ email, password }) => {
  const user = await User.findOne({ email })
  if (!user) { throw new NotAuthorized(`No user with such ${email} find`) }
  if (!await bcrypt.compare(password, user.password)) {
    jwt.sign({ _id: user._id })
  }
}

module.exports = {
  login,
  registration
}
