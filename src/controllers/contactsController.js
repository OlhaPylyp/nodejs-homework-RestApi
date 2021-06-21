const {
  getContact,
  getContactById,
  deleteContact,
  addContact,
  updateContactById,
  updateStatusContact,
} = require('../service/contactService')

const getContactsController = async (req, res, next) => {
  try {
    const client = await getContact()
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
    const client = await getContactById(id)
    if (!client) {
      return res.status(404).json(`There are no client with ${id} in db!`)
    }
    return res.status(200).json({
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
    const client = addContact({ name, email, phone, favorite })
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
    await deleteContact(id)
    res.status(200).json({
      status: 'success',
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const updateContactController = async (req, res) => {
  const { id } = req.params
  const { name, email, phone, favorite } = req.body
  try {
    const client = await updateContactById(id, { name, email, phone, favorite })
    res.status(200).json(`client  ${client} with ${id} update`)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
const updateStatusContactController = async (req, res) => {
  const { id } = req.params
  const { favorite } = req.body
  if (!favorite) {
    res.status(400).json({ message: 'missing field favorite' })
  }
  const contacts = updateStatusContact(id, { favorite })
  res.status(200).json({
    status: 'success',
    data: {
      contacts,
    },
  })
}

module.exports = {
  getContactsController,
  getContactIdController,
  postContactsController,
  deleteContactController,
  updateContactController,
  updateStatusContactController
}
