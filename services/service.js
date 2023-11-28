const Connection = require("../config/dbConnection");

const getAllContacts = (page, limit, search, callback) => {
  const offset = (page - 1) * limit;
  const q =
    'SELECT * FROM contacts WHERE CONCAT(first_name, " ", last_name) LIKE ? LIMIT ? OFFSET ?';

  Connection.query(
    q,
    [`%${search}%`, parseInt(limit), parseInt(offset)],
    callback
  );
};

const getSingleContact = (id, callback) => {
  const query = "SELECT * FROM contacts WHERE id = ?";
  Connection.query(query, [id], callback);
};

const postContact = (contactData, callback) => {
  const query =
    "INSERT INTO contacts (`first_name`, `last_name`, `phone`, `email`) VALUES (?)";

  Connection.query(query, [contactData], callback);
};

const deleteContact = (id, callback) => {
  const query = "DELETE FROM contacts WHERE id = ?";
  Connection.query(query, [id], callback);
};

const updateContact = (id, contactData, callback) => {
  const query =
    "UPDATE contacts SET `first_name` = ?, `last_name` = ?, `phone` = ?, `email` = ? WHERE id = ?";
  Connection.query(query, [...contactData, id], callback);
};

module.exports = {
  getAllContacts,
  getSingleContact,
  postContact,
  deleteContact,
  updateContact,
};
