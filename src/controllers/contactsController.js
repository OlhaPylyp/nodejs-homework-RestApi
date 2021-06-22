const {
  getContact,
  getContactById,
  deleteContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require('../service/contactService.js')

const getContactsController = async (req, res, next) => {
  try {
    const client = await getContact()
    res.status(200).json({ client })
  } catch (error) {
    res.status(400).json({ message: error.message })
    next(error)
  }
}

const getContactIdController = async (req, res, next) => {
  const { id } = req.params
  try {
    const client = await getContactById(id)
    console.log('client', client)
    if (!client) {
      return res.status(404).json(`There are no client with ${id} in db!`)
    }
    return res.status(200).json({ client })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const postContactsController = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body
  try {
    const client = await addContact({ name, email, phone, favorite })
    res.status(200).json({ client })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
const deleteContactController = async (req, res, next) => {
  const { id } = req.params
  console.log(id)
  try {
    await deleteContact(id)
    res.status(200).json({
      status: 'deleted success',
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const updateContactController = async (req, res, next) => {
  const { id } = req.params
  const { name, email, phone } = req.body
  try {
    const client = await updateContact(id, { name, email, phone })
    if (client) { return res.status(200).json(`client with ${id} update`) }
    return res.status(404).json({
      message: `Not found client id: ${id}`,
      data: 'Not Found',
    })
  } catch (e) {
    console.error(e)
    next(e)
  }
}

const updateStatusContactController = async (req, res, next) => {
  const { id } = req.params
  const { favorite } = req.body
  console.log('req.body', req.body)
  try {
    const client = await updateStatusContact(id, { favorite })
    if (client) { return res.status(200).json(`client with ${id} update favorite status`) }
    return res.status(404).json({
      message: `Not found client id: ${id}`,
      data: 'Not Found',
    })
  } catch (e) {
    console.error(e)
    next(e)
  }
}

module.exports = {
  getContactsController,
  getContactIdController,
  postContactsController,
  deleteContactController,
  updateContactController,
  updateStatusContactController
}
