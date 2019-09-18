const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  register,
  login
};

function find() {
  return db("users");
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function register(newUser) {
  return db("users")
    .insert(newUser, "id")
    .then(([id]) => {
      return findById(id);
    });
}

function login(filter) {
  return db("users")
    .where(filter)
    .first();
}
