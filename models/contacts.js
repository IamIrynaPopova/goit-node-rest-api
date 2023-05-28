const fs = require("fs/promises");
const path = require("path");

const folder = "./models";
const filename = "contacts.json";
const contactsPath = path.join(folder, filename);

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data.toString());
  return contacts;
};

const getContactById = async (contactId) => {
  try {
    const data = await listContacts();
    const contact = await data.find((contact) => contact.id === contactId);
    return contact || null;
  } catch (err) {
    console.error(err);
  }
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
