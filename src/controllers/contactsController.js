const { Contacts } = require('../db/contactModel')
const getContactsController = async (req, res, next) => {
  try {
    const client = await Contacts.find({})
    res.json({
      status: 'success',
      code: 200,
      data: {
        contacts: client,
      },
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const getContactIdController = async (req, res, next) => {
  const { id } = req.params
  try {
    const client = await Contacts.findById(id)
    if (!client) {
      res.status(404).json('There are no client in db!')
    }
    res.status(200).json({
      status: 'success',
      data: {
        contacts: client,
      },
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const postContactsController = async (req, res) => {
  const { name, email, phone, favorite } = req.body
  try {
    const client = await Contacts({name, email, phone, favorite })
    res.status(200).json({
      status: 'success',
      data: {
        contacts: client,
      },
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
const deleteContactController = async (req, res, next) => {
  const { id } = req.params
  try {
    const client = await Contacts.findByIdAndRemove(id)
    res.status(200).json(client)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const updateContactController = async (req, res) => {
  const { id } = req.params
  const { name, email, phone, favorite } = req.body
  try {
    const client = await Contacts.findByIdAndUpdate(id, { name, email, phone, favorite })
    res.status(200).json(`client  ${client} with ${id} update`)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
const updateStatusContact = async (req, res) => {
  const { id } = req.params
  const { favorite } = req.body
  const client = await Contacts.findByIdAndUpdate(id, { favorite })
  if (!client) {
    res.status(400).json(updateStatusContact(contactId, body))
  }
  res.status(200).json({
    status: 'success',
    data: {
      contacts: client,
    },
  })
}

module.exports = {
  getContactsController,
  getContactIdController,
  postContactsController,
  deleteContactController,
  updateContactController,
  patchContactController
}
