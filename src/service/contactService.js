
const { Contact } = require('../db/contactModel')

const getContact = async () => {
  return await Contact.find()
}
const getContactById = async (clientId) => {
  const client = await Contact.findById(clientId)
  return client
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

const updateContact = async ({ clientId, fields }) => {
  const client = await Contact.findByIdAndUpdate(clientId, { $set: { ...fields } })
  return client
}

const updateStatusContact = async (contactId, { favorite }) => {
  const updateClient = await Contact.findByIdAndUpdate(contactId, {
    $set: ({ favorite }),
  }, { new: true })
  return updateClient
}
const deleteContact = async (clientId) => {
  return await Contact.findByIdAndRemove(clientId)
}

module.exports = {
  getContact,
  getContactById,
  deleteContact,
  addContact,
  updateContact,
  updateStatusContact,
}
