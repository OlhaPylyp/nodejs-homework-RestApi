const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.join('./model/contacts.json')

const getListContact = () => {
  return fs.readFile(contactsPath, 'utf8')
}
const writeToJson = (data) => {
  return fs.writeFile(contactsPath, data)
}

const listContacts = async () => {
  try {
    const listContact = await getListContact()
    return JSON.parse(listContact)
  } catch (err) {
    console.log(err.message)
  }
}

const getContactById = async (contactId) => {
  try {
    const listContact = await getListContact()
    const contact = JSON.parse(listContact)
    const contactById = contact.find(({ id }) => id.toString() === contactId)
    return contactById
  } catch (err) {
    console.log(err.message)
  }
}

const removeContact = async (contactId) => {
  try {
    const listContact = await fs.readFile(contactsPath, 'utf8')
    const contact = JSON.parse(listContact)
    const idDeleteList = contact.filter(
      ({ id }) => id.toString() !== contactId
    )
    const contactsList = JSON.stringify(idDeleteList)
    await writeToJson(contactsList)
  } catch (err) {
    console.log(err.message)
  }
}

const addContact = async (body) => {
  try {
    const listContact = await fs.readFile(contactsPath, 'utf8')
    const contact = JSON.parse(listContact)
    const contactNew = { id: new Date(), body }
    const contactsList = JSON.stringify([contactNew, ...contact], null, '\t')
    await writeToJson(contactsList)
  } catch (err) {
    console.log(err.message)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const listContact = await fs.readFile(contactsPath, 'utf8')
    const contact = JSON.parse(listContact)
    const contactNew = { id: new Date(), body }
    const updateContact = contact.filter(
      ({ id }) => id.toString() === contactId
    )
    contactNew.body = updateContact
    const contactsList = JSON.stringify([...contactNew], null, '\t')
    await writeToJson(contactsList)
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
