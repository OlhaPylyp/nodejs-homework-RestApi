const express = require("express");
const router = express.Router();

const {
  getContactsController,
  getContactIdController,
  postContactsController,
  deleteContactController,
  updateContactController,
} = require("../../controllers/contactsController.js");
const {
  validationData,
  updateContactValidation,
} = require("../../middlewares/validation.js");
// const { authMiddleware } = require("../../middlewares/authMiddlware");

router.use(authMiddleware);
router.get("/", getContactsController);
router.get("/:id", getContactIdController);
router.post("/", validationData, postContactsController);
router.delete("/:id", deleteContactController);
router.put("/:id", updateContactValidation, updateContactController);

module.exports = router;
