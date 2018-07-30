const express = require("express");
const router = express.Router();
const config = require("../config.js");
const models = require("../models");
const bcrypt = require("bcrypt-nodejs");

router.post("/", function(req, res) {
  const { login, password } = req.body;

  console.log("login: ", login);

  if (!login || !password) {
    const fields = [];
    if (!login) fields.push("login");
    if (!password) fields.push("password");

    res.json({
      ok: false,
      error: "Все поля должны быть заполнены!",
      fields
    });
  }
});

module.exports = router;
