const express = require("express");
const router = express.Router();
const User = require("./auth-helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = require("../config/secrets");

router.post("/register", (req, res) => {
  const { username, password } = req.body;

  const hash = bcrypt.hashSync(password, 10);

  User.register({ username, password: hash })
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(error => {
      res.status(500).json({ error: "Could not register user" });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  User.login({ username })
    .then(user => {
      const authenticate = bcrypt.compareSync(password, user.password);
      if (user && authenticate) {
        const token = genereateToken(user);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "Server could not log you in" });
    });
});

function genereateToken(user) {
  const payload = {
    username: user.username
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;
