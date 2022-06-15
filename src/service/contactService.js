const { Contact } = require("../db/contactModel");

const getContact = async () => {
  return await Contact.find({});
};
const getContactById = async (id) => {
  return await Contact.findById({ _id: id });
};
const addContact = async ({ name, surname, email, tel, work }) => {
  const newClient = new Contact({
    name,
    surname,
    email,
    tel,
    work,
  });
  return await newClient.save();
};

const updateContact = async (id, { name, surname, email, tel, work }) => {
  const client = await Contact.findByIdAndUpdate(
    { _id: id },
    { $set: { name, surname, email, tel, work } }
  );
  return client;
};
const deleteContact = async (id) => {
  return await Contact.findByIdAndRemove({ _id: id });
};

module.exports = {
  getContact,
  getContactById,
  deleteContact,
  addContact,
  updateContact,
};
