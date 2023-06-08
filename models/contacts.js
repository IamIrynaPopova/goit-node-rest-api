const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../middlewares");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = Contact;

// const fs = require("fs/promises");
// const path = require("path");
// const { v4: uuidv4 } = require("uuid");

// const folder = "./models";
// const filename = "contacts.json";
// const contactsPath = path.join(folder, filename);

// const listContacts = async () => {
//   const data = await fs.readFile(contactsPath);
//   const contacts = JSON.parse(data.toString());
//   return contacts;
// };

// const getContactById = async (contactId) => {
//   const data = await listContacts();
//   const contact = await data.find((contact) => contact.id === contactId);
//   return contact || null;
// };

// const removeContact = async (contactId) => {
//   const data = await listContacts();
//   const existingContact = data.find((contact) => contact.id === contactId);
//   if (!existingContact) {
//     return null;
//   }
//   const filterContacts = await data.filter(
//     (contact) => contact.id !== contactId
//   );
//   await fs.writeFile(contactsPath, JSON.stringify(filterContacts));
//   return filterContacts;
// };

// const addContact = async (body) => {
//   const { name, email, phone } = body;
//   const data = await listContacts();
//   const newContact = { id: uuidv4(), name, email, phone };
//   data.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(data));
//   return newContact;
// };

// const updateContact = async (contactId, body) => {
//   const data = await listContacts();
//   const indexUpdateContact = await data.findIndex(
//     (contact) => contact.id === contactId
//   );
//   if (indexUpdateContact !== -1) {
//     data[indexUpdateContact] = {
//       ...data[indexUpdateContact],
//       ...body,
//     };
//     await fs.writeFile(contactsPath, JSON.stringify(data));
//     return body;
//   } else {
//     return null;
//   }
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
