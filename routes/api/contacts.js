const express = require('express')
const router = express.Router()

const {
  listContacts,
  getContactById,
  // removeContact,
  // addContact,
  // updateContact,
} = require('../../model/index')

router.get('/', async (req, res, next) => {
  const data = await listContacts()
  console.log('data=', data)
  res.json({
    status: 'success',
    code: 200,
    data,
  })
})
router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const data = await getContactById(contactId)
  res.json({
    status: 'success',
    code: 200,
    data
  })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
