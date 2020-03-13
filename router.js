const express = require("express");
const db = require("./dbModle");
const router = express.Router();
const restrict = require("./restrict");

router.post("/register", async (req, res, next) => {
  try {
    const user = { username: req.body.username, password: req.body.password };

    const newUser = await db.createUser(user);
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.get("/login", restrict(), async (req, res, next) => {
  try {
    res.json(await db.find());
  } catch (error) {
    next(error);
  }
});

router.get("/users", async (req, res, next) => {
  try {
    const users = await db.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
