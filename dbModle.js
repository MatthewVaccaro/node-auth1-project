const db = require("./data/config");
const bcrypt = require("bcryptjs");

async function createUser(user) {
  user.password = await bcrypt.hash(user.password, 10);
  return db.insert(user).into("users");
}

function find() {
  return db("users").select("id", "username");
}

function findByid(id) {
  return db("*")
    .from("users")
    .where("id", id);
}

function findBy(filter) {
  return db("users")
    .select("id", "username", "password")
    .where(filter);
}

module.exports = {
  createUser,
  find,
  findByid,
  findBy
};
