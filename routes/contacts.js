const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const auth = require("../middleware/auth");

//route GET api/contacts
//description - Get all connections of the user
//access - Private

router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//route POST api/contacts
//description - Add a connection
//access - Private

router.post(
  "/",
  [auth, [body("name", "name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;
    try {
      const newConnection = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newConnection.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message);
    }
  }
);

//route PUT api/contacts/:id
//description - Update connection
//access - Private

router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  const contactFields = {};
  if (name) contactFields.name = name;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;
  if (email) contactFields.email = email;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ msg: "Connection doesnt exist" });
    }

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorized action" });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server erorr");
  }
});

//route DELETE api/contacts/:id
//description - Delete connection
//access - Private

router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ msg: "Connection doesnt exist" });
    }

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorized action" });
    }

    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: "Connection removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server erorr");
  }
});

module.exports = router;
