const express = require('express');
const cors = require('cors');
const db = require("../contact list api/config/dbConnection");
const PORT = 4000;
const app = express();
const contactRoute = require("./router/homeRouter");

app.use(cors());
app.use(express.json());
app.use('/', contactRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
