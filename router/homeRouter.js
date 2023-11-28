const express = require('express');
const router = express.Router();
const { getAllContacts, postContact, deleteContact, updateContact, getSingleContact } = require("../controllers/contactListController")

router.route('/').get(getAllContacts);
router.route('/:id').get(getSingleContact);
router.route('/').post(postContact);
router.route('/:id').delete(deleteContact);
router.route('/:id').put(updateContact);

module.exports = router;
