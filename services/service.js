const Connection = require("../config/dbConnection");

const getContactsByPage = (page, limit, search, callback) => {
  const offset = (page - 1) * limit;
  let q = 'SELECT * FROM contacts';

  const params = [];
  if (search) {
    q += ' WHERE CONCAT(first_name, " ", last_name," ",phone," ",email) LIKE ?';
    params.push(`%${search}%`);
  }

  // Get total count of contacts without limit and offset
  const countQuery = 'SELECT COUNT(*) AS count FROM contacts' + (search ? ' WHERE CONCAT(first_name, " ", last_name," ",phone," ",email) LIKE ?' : '');
  const countParams = search ? [`%${search}%`] : [];

  Connection.query(countQuery, countParams, (err, countResults) => {
    if (err) {
      callback(err, null);
    } else {
      const totalCount = countResults[0].count;

      q += ' LIMIT ? OFFSET ?';
      params.push(parseInt(limit), parseInt(offset));

      Connection.query(q, params, (err, results) => {
        if (err) {
          callback(err, null);
        } else {
          const totalPages = Math.ceil(totalCount / limit);
          const hasNextPage = page < totalPages;
          const hasPreviousPage = page > 1;

          const responseData = {
            total: totalCount,
            totalPages,
            currentPage: page,
            hasNextPage,
            hasPreviousPage,
            data: results,
          };

          callback(null, responseData);
        }
      });
    }
  });
};

const getContactById = (id, callback) => {
  const query = "SELECT * FROM contacts WHERE id = ?";
  Connection.query(query, [id], callback);
};

const addContact = (contactData, callback) => {
  const query =
    "INSERT INTO contacts (`first_name`, `last_name`, `phone`, `email`) VALUES (?)";

  Connection.query(query, [contactData], callback);
};

const removeContact = (id, callback) => {
  const query = "DELETE FROM contacts WHERE id = ?";
  Connection.query(query, [id], callback);
};

const updateCurrentContact = (id, contactData, callback) => {
  const query =
    "UPDATE contacts SET `first_name` = ?, `last_name` = ?, `phone` = ?, `email` = ? WHERE id = ?";
  Connection.query(query, [...contactData, id], callback);
};

module.exports = {
  getContactsByPage,
  getContactById,
  addContact,
  removeContact,
  updateCurrentContact,
};
