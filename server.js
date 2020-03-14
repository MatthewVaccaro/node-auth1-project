const express = require("express");
const router = require("./router.js");
const session = require("express-session");

const server = express();
server.use(express.json());
server.use(
  session({
    name: "token",
    resave: false,
    saveUninitialized: false,
    secret: "Your mother was a hampster"
  })
);
server.use("/api", router);

server.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome from Auth 1" });
});

module.exports = server;
