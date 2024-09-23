const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { User, validate } = require("../models/user");
const hashPassWord = require("../hash");

router.get("/", (req, res) => {
  res.send("Hello");
});

router.post("/addUser", async (req, res) => {
  const { error } = validate(_.pick(req.body, ["name", "email", "password"]));
  if (error) return res.status(400).send(error?.details[0]?.message);
  let user = await User.findOne({ email: req?.body?.email });
  if (user) return res.status(400).send("email id already in use!");
  user = new User(_.pick(req.body, ["email", "name", "password"]));
  user.password = await hashPassWord(user.password);
  await user.save();
  res.send(_.pick(user, ["email", "name", "_id"]));
});

module.exports = router;
