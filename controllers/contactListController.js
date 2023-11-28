const ContactService = require("../services/service");

const getAllContacts = (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 5;
  const search = req.query.search || "";

  ContactService.getAllContacts(page, limit, search, (err, results) => {
    if (err) {
      console.error("Error occurred on fetching: ", err);
      res.status(500).json("Error occurred on fetching");
    } else {
      console.log("Data fetched successfully");
      res.status(200).json(results);
    }
  });
};

const getSingleContact = (req, res) => {
  const id = req.params.id;

  ContactService.getSingleContact(id, (err, results) => {
    if (err) {
      console.error("Error occurred during single contact get: ", err);
      res.status(500).json("Error occurred on single get");
    } else {
      console.log("Data fetched successfully");
      res.status(200).json(results);
    }
  });
};

const postContact = (req, res) => {
  const { first_name, last_name, phone, email } = req.body;
  const contactData = [first_name, last_name, phone, email];

  ContactService.postContact(contactData, (err, results) => {
    if (err) {
      console.error("Error occurred on inserting data:", err);
      res.status(500).json("Error on inserting data");
    } else {
      console.log("Data inserted successfully");
      res.status(200).json("Data inserted successfully");
    }
  });
};

const deleteContact = (req, res) => {
  const id = req.params.id;

  ContactService.deleteContact(id, (err, data) => {
    if (err) {
      console.error("Error occurred on delete contact:", err);
      res.status(500).json("Error on deleting data");
    } else {
      console.log("Data has been deleted");
      res.status(200).json("Data deleted successfully");
    }
  });
};

const updateContact = (req, res) => {
  const id = req.params.id;
  const { first_name, last_name, phone, email } = req.body;
  const contactData = [first_name, last_name, phone, email];

  ContactService.updateContact(id, contactData, (err, data) => {
    if (err) {
      console.error("Error occurred during contact update:", err);
      res.status(500).json("Internal Server Error");
    } else {
      console.log("Contact updated successfully");
      res.status(200).json("Data updated successfully");
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
