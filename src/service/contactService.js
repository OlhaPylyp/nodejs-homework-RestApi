
const { Contact } = require('../db/contactModel')
// const select = '-_id -owner -__v'
const { NotAuthorized } = require('../helpers/errors')

const getContact = async (userId) => {
  console.log('userId', userId)
  return await Contact.find({ owner: userId })
}
const getContactById = async (userId, id) => {
  if (!userId) {
    throw new NotAuthorized('Not authorized')
  }
  return await Contact.findById({ owner: userId, _id: id })
}
const addContact = async ({ name, email, phone }, userId) => {
  console.log('userId', userId)
  const newClient = new Contact({
    name,
    email,
    phone,
    owner: userId,
  })
  console.log('newClient', newClient)
  return await newClient.save()
}

const updateContact = async (id, { name, email, phone }, userId) => {
  const client = await Contact.findByIdAndUpdate({ _id: id, owner: userId }, { $set: { name, email, phone } })
  return client
}

const updateStatusContact = async (id, userId, { favorite }) => {
  const updateClient = await Contact.findByIdAndUpdate(
    { _id: id, owner: userId },
    { $set: { favorite } },
    { new: true }
  )
  return updateClient
}
const deleteContact = async (id) => {
  return await Contact.findByIdAndRemove(id)
}

module.exports = {
  getContact,
  getContactById,
  deleteContact,
  addContact,
  updateContact,
  updateStatusContact,
}
