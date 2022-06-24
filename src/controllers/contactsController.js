const {
  getContact,
  getContactById,
  deleteContact,
  addContact,
  updateContact,
} = require("../service/contactService.js");

const getContactsController = async (req, res, next) => {
  try {
    const contacts = await getContact();
    res.status(200).json({ contacts });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getContactIdController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await getContactById(id);

    if (!contact) {
      return res.status(404).json(`There are no client with ${id} in db!`);
    }
    return res.status(200).json({ contact });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const postContactsController = async (req, res, next) => {
  const { name, surname, email, tel, work } = req.body;
  try {
    const contact = await addContact({ name, surname, email, tel, work });
    return res.status(200).json({ status: "contact added", contact });
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
    const contact = await updateContact(id, {
      name,
      surname,
      email,
      tel,
      work,
    });
    if (contact) {
      // res.status(200).json(`contact with ${id} update`);
      res.status(200).json({ contact });
    }
    res.status(404).json({
      message: `Not found contact id: ${id}`,
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
