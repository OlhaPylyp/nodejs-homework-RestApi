const express = require('express')
const router = express.Router()

const {
  getContactsController,
  getContactIdController,
  postContactsController,
  deleteContactController,
  updateContactController,
  updateStatusContactController
} = require('../controllers/contactsController')
const { validationData, updateContactValidation, updateStatusContactValidation } = require('../middlewares/validation')

router.get('/', getContactsController)
router.get('/:contactId', getContactIdController)
router.post('/', validationData, postContactsController)
router.delete('/:contactId', deleteContactController)
router.put('/:contactId', updateContactValidation, updateContactController)
router.patch('/:contactId', updateStatusContactValidation, updateStatusContactController)

module.exports = router
