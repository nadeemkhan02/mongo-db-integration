const express = require("express");
const router = express.Router();
const Joi = require("joi");
const config = require("config");
const _ = require("lodash");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.send("Hello");
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error?.details[0]?.message);
  let user = await User.findOne({ email: req?.body?.email });
  if (!user) return res.status(400).send("email or password is invalid");
  const validPassword = await bcrypt.compare(req.body?.password, user.password);
  if (!validPassword)
    return res.status(400).send("email or password is invalid");
  const token = user.getJwtToken();
  res
    .status(200)
    .header("x-auth-token", token)
    .send({ name: user?.name, email: user?.email });
});

const validate = (req) => {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(req, schema);
};

module.exports = router;
