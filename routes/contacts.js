const express = require("express");
const router = express.Router();

//route GET api/contacts
//description - Get all connections of the user
//access - Private

router.get("/", (req, res) => {
  res.send("Get contacts for user");
});

//route POST api/contacts
//description - Add a connection
//access - Private

router.post("/", (req, res) => {
  res.send("Add connection");
});

//route PUT api/contacts/:id
//description - Update connection
//access - Private

router.put("/:id", (req, res) => {
  res.send("Update connection");
});

//route DELETE api/contacts/:id
//description - Delete connection
//access - Private

router.delete("/:id", (req, res) => {
  res.send("Delete connection");
});

module.exports = router;
