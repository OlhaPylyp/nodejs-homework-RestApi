const express = require('express')
const router = express.Router()

const {
  getContacts,
  getContactId,
  postContacts,
  deleteContact,
  putContact
} = require('../../model/index')
const { validationData } = require('../../middlewares/validation')

router.get('/', getContacts)
router.get('/:contactId', getContactId)
router.post('/', validationData, postContacts)
router.delete('/:contactId', deleteContact)
router.put('/:contactId', validationData, putContact)

module.exports = router
