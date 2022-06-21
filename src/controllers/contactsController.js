const {
  getContact,
  getContactById,
  deleteContact,
  addContact,
  updateContact,
} = require("../service/contactService.js");

const getContactsController = async (req, res, next) => {
  try {
    const client = await getContact();
    res.status(200).json({ client });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getContactIdController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const client = await getContactById(id);

    if (!client) {
      return res.status(404).json(`There are no client with ${id} in db!`);
    }
    return res.status(200).json({ client });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const postContactsController = async (req, res, next) => {
  const { name, surname, email, tel } = req.body;
  try {
    const client = await addContact({ name, surname, email, tel, work });
    return res.status(200).json({ status: "contact added", client });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const deleteContactController = async (req, res, next) => {
  const { id } = req.params;
  try {
    await deleteContact(id);
    res.status(200).json({
      status: "deleted success",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateContactController = async (req, res, next) => {
  const { id } = req.params;
  const { name, surname, email, tel, work } = req.body;
  try {
    const client = await updateContact(id, { name, surname, email, tel, work });
    if (client) {
      res.status(200).json(`client with ${id} update`);
    }
    res.status(404).json({
      message: `Not found client id: ${id}`,
      data: "Not Found",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getContactsController,
  getContactIdController,
  postContactsController,
  deleteContactController,
  updateContactController,
};
