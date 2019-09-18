const express = require("express");
const router = express.Router();
const User = require("./user-helpers");

router.get("/", restricted, (req, res) => {
  User.find().then(users => {
    res.status(200).json(users);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ error: "Server could not get user" });
    });
});

module.exports = router;
