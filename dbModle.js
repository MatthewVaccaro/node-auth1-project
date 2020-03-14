const db = require("./data/config");
const bcrypt = require("bcryptjs");

async function createUser(user) {
  user.password = await bcrypt.hash(user.password, 10);
  return db
    .insert(user)
    .into("users")
    .then(res => {
      const id = res[0];
      return db
        .select("username")
        .from("users")
        .where({ id });
    });
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
    .where(filter)
    .first();
}

module.exports = {
  createUser,
  find,
  findByid,
  findBy
};
