const { Cont } = require("../db/contactModel");

const getContact = async () => {
  return await Cont.find({});
};
const getContactById = async (id) => {
  return await Cont.findById({ _id: id });
};
const addContact = async ({ name, surname, email, tel, work }) => {
  const newClient = new Cont({
    name,
    surname,
    email,
    tel,
    work,
  });
  return await newClient.save();
};

const updateContact = async (id, { name, surname, email, tel, work }) => {
  const client = await Cont.findByIdAndUpdate(
    { _id: id },
    { $set: { name, surname, email, tel, work } }
  );
  return client;
};
const deleteContact = async (id) => {
  return await Cont.findByIdAndRemove({ _id: id });
};

module.exports = {
  getContact,
  getContactById,
  deleteContact,
  addContact,
  updateContact,
};
