
const { Contact } = require('../db/contactModel')

const getContact = async () => {
  return await Contact.find()
}
const getContactById = async (id) => {
  return await Contact.findById(id)
}
const addContact = async ({ name, email, phone }) => {
  const newClient = new Contact({
    name,
    email,
    phone,
  })
  await newClient.save()
  return newClient
}

const updateContact = async (id, { name, email, phone }) => {
  const client = await Contact.findByIdAndUpdate(id, { $set: { name, email, phone } })
  return client
}

const updateStatusContact = async (id, { favorite }) => {
  const updateClient = await Contact.findByIdAndUpdate(
    id,
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
