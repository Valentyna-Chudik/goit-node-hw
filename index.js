const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");
const argv = require("yargs").argv;

// listContacts("db/contacts.json");
// getContactById(7);
// removeContact("41hpyU0xO");
// addContact("Val", "dfsdgh@ukr.net", "(057) 812 -6363");

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      getContactById(id);
      break;

    case "add":
      addContact(name, email, phone);
      break;

    case "remove":
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
