const { promises: fsPromises } = require("fs"); //File System
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const file = await fsPromises.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(file);
    console.table(contacts);
  } catch (err) {
    console.log(err.message);
  }
}

// listContacts(contactsPath);

async function getContactById(contactId) {
  try {
    const file = await fsPromises.readFile(contactsPath, "utf-8");
    const contactById = await JSON.parse(file).find(
      ({ id }) => id === contactId
    );
    if (!contactById) {
      console.log(`Sorry, contact with id ${contactId} wasn't found`);
      return;
    } else {
      console.log(`Contact with id ${contactId} was found`);
      console.table(contactById);
    }
  } catch (err) {
    console.log(err.message);
  }
}

// getContactById(11);

async function removeContact(contactId) {
  try {
    const file = await fsPromises.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(file);
    const updatedContacts = contacts.filter(({ id }) => id !== contactId);

    if (contacts.length === updatedContacts.length) {
      console.log(`Sorry, contact with id ${contactId} wasn't found`);
      return;
    } else {
      await fsPromises.writeFile(
        contactsPath,
        JSON.stringify(updatedContacts, "utf8")
      );
      console.log(`Contact with id ${contactId} was deleted`);
      listContacts();
    }
  } catch (err) {
    console.log(err.message);
  }
}

// removeContact(1);

async function addContact(name, email, phone) {
  try {
    const file = await fsPromises.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(file);

    if (
      contacts.find(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      console.log(`Sorry, contact with name ${name} already exists`);
      return;
    } else if (contacts.find((contact) => contact.email === email)) {
      console.log(`Sorry, contact with name ${email} already exists`);
      return;
    } else if (contacts.find((contact) => contact.phone === phone)) {
      console.log(`Sorry, contact with name ${phone} already exists`);
      return;
    } else {
      const newContact = { id: shortid.generate(), name, email, phone };
      const updatedContacts = [...contacts, newContact];
      await fsPromises.writeFile(
        contactsPath,
        JSON.stringify(updatedContacts, "utf8")
      );
      console.log(`New contact ${name} was added succsessfully`);
    }
    listContacts();
  } catch (err) {
    console.log(err.message);
  }
}

// addContact("Val", "dfsdgh@ukr.net", "(057) 812 -6363");

module.exports = { listContacts, getContactById, removeContact, addContact };
