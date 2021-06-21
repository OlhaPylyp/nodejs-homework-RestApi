
const { Contacts } = require('../db/contactModel')

const getContact = async () => { return await Contacts.find({}) }
const getContactById = async (id) => {
  return await Contacts.findById(id)
}
const addContact = async ({ name, email, phone, favorite }) => {
  const client = new Contacts({ name, email, phone, favorite })
  await client.save
}
const updateContactById = async (id, { name, email, phone, favorite }) => {
  const client = await Contacts.findByIdAndUpdate(id, { name, email, phone, favorite })
  return client
}
const updateStatusContact = async (contactId, { favorite }) => {
  const contact = await getContactById(contactId)
  await Contacts.findByIdAndUpdate(contactId, {
    $set: (contact.favorite = favorite),
  })
}
const deleteContact = async (id) => {
  return await Contacts.findByIdAndRemove(id)
}

module.export = {
  getContact,
  getContactById,
  deleteContact,
  addContact,
  updateContactById,
  updateStatusContact,
}
