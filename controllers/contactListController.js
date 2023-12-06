const ContactService = require("../services/service");

const getAllContacts = (req, res) => {
  const page = parseInt(req.query.page) || ""; 
  const limit = parseInt(req.query.limit) || ""; 
  const search = req.query.search || "";

  ContactService.getContactsByPage(page, limit, search, (err, results) => {
    if (err) {
      console.error("Error occurred on fetching: ", err);
      res.status(500).json("Error occurred on fetching");
    } else {
      console.log("Contacts fetched successfully");
      res.status(200).json(results);
    }
  });
};


const getSingleContact = (req, res) => {
  const id = req.params.id;

  ContactService.getContactById(id, (err, results) => {
    if (err) {
      console.error("Error occurred during single contact get: ", err);
      res.status(500).json("Error occurred on single get");
    } else {
      console.log("Contact fetched successfully");
      res.status(200).json(results);
    }
  });
};

const postContact = (req, res) => {
  const { first_name, last_name, phone, email } = req.body;
  const contactData = [first_name, last_name, phone, email];

  ContactService.addContact(contactData, (err, results) => {
    if (err) {
      console.error("Error occurred on inserting data:", err);
      res.status(500).json("Error on inserting data");
    } else {
      console.log("Contact inserted successfully");
      res.status(200).json("Contact inserted successfully");
    }
  });
};

const deleteContact = (req, res) => {
  const id = req.params.id;

  ContactService.removeContact(id, (err, data) => {
    if (err) {
      console.error("Error occurred on delete contact:", err);
      res.status(500).json("Error on deleting data");
    } else {
      console.log("Contact has been deleted");
      res.status(200).json("Contact deleted successfully");
    }
  });
};

const updateContact = (req, res) => {
  const id = req.params.id;
  const { first_name, last_name, phone, email } = req.body;
  const contactData = [first_name, last_name, phone, email];

  ContactService.updateCurrentContact(id, contactData, (err, data) => {
    if (err) {
      console.error("Error occurred during contact update:", err);
      res.status(500).json("Internal Server Error");
    } else {
      console.log("Contact updated successfully");
      res.status(200).json("Contact updated successfully");
    }
  });
};

module.exports = {
  getAllContacts,
  getSingleContact,
  postContact,
  deleteContact,
  updateContact,
};
