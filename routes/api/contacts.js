const express = require('express')
const router = express.Router()

const {
  getContacts,
  getContactId,
  postContacts,
  deleteContact,
  putContact
} = require('../../controllers/contactsController')
const { validationData } = require('../../middlewares/validation.js')

router.get('/', getContacts)
router.get('/:contactId', getContactId)
router.post('/', validationData, postContacts)
router.delete('/:contactId', deleteContact)
router.put('/:contactId', validationData, putContact)

module.exports = router
