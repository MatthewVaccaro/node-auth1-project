const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const db = require("./dbModle");
const { restrict } = require("./restrict");

router.post("/register", async (req, res, next) => {
  try {
    const user = { username: req.body.username, password: req.body.password };
    if (!user) {
      res.status(400).json({ message: "missing body" });
    }
    const addUser = await db.createUser(user);
    res.status(201).json(addUser);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "missing body" });
    }
    const user = await db.findBy({ username });
    if (!user) {
      return res.status(401).json({ message: "invalid or wrong info" });
    }
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return res.status(401).json({ message: "invalid or wrong info" });
    }

    // const authToken = Math.random();
    // sessions[authToken] = user.id;

    // res.setHeader("Authorization", authToken);
    // res.setHeader("Set-Cookie", `token=${authToken}; Path=/`);

    req.session.user = user;
    console.log("req.session", req.session);

    res.status(200).json({ message: `welcome ${user.username}` });
  } catch (error) {
    next(error);
  }
});

router.get("/users", restrict(), async (req, res, next) => {
  try {
    const users = await db.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  user = await db.findByid(req.params.id);
  res.status(200).json(user);
});

module.exports = router;
