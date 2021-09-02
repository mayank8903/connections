const express = require("express");
const router = express.Router();

//route GET api/auth
//description - Get logged in user
//access - Private

router.get("/", (req, res) => {
  res.send("Get logged in user");
});

//route POST api/auth
//description - Authenticate user and get token
//access - public

router.post("/", (req, res) => {
  res.send("Login user");
});

module.exports = router;
