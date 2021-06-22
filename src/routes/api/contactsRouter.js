const express = require('express')
const router = express.Router()

const {
  getContactsController,
  getContactIdController,
  postContactsController,
  deleteContactController,
  updateContactController,
  updateStatusContactController,
} = require('../../controllers/contactsController.js')
const { validationData, updateContactValidation, updateStatusContactValidation } = require('../../middlewares/validation.js')

router.get('/', getContactsController)
router.get('/:id', getContactIdController)
router.post('/', validationData, postContactsController)
router.delete('/:id', deleteContactController)
router.put('/:id', updateContactValidation, updateContactController)
router.patch('/:id/favorite', updateStatusContactValidation, updateStatusContactController)

module.exports = router
