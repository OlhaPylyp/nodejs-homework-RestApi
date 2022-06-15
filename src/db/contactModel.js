const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  surname: {
    type: String,
    // required: [true, "Set surname for contact"],
  },
  email: {
    type: String,
  },
  tel: {
    type: String,
  },
  work: {
    type: String,
  },
});

const Contact = mongoose.model("contact", contactSchema);
module.exports = { Contact };
