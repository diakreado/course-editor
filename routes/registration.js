const express = require("express");
const router = express.Router();
const config = require("../config.js");
const models = require("../models");
const bcrypt = require("bcrypt-nodejs");

router.get("/", function(req, res) {
  res.render("registration", {
    title: config.NAME_OF_PROJECT
  });
});

router.post("/", function(req, res) {
  const { name, login, password, passwordConfirm } = req.body;

  models.User.findOne({
    login
  }).then(user => {
    if (!user) {
      if (!name || !login || !password || !passwordConfirm) {
        const fields = [];
        if (!name) fields.push("name");
        if (!login) fields.push("login");
        if (!password) fields.push("password");
        if (!passwordConfirm) fields.push("passwordConfirm");

        res.json({
          ok: false,
          error: "Все поля должны быть заполнены!",
          fields
        });
      } else if (login.length < 3 || login.length > 16) {
        res.json({
          ok: false,
          error: "Длина логина от 3 до 16 символов!",
          fields: ["login"]
        });
      } else if (password !== passwordConfirm) {
        res.json({
          ok: false,
          error: "Пароли не совпадают",
          fields: ["password", "passwordConfirm"]
        });
      } else {
        bcrypt.hash(password, null, null, function(err, hash) {
          models.User.create({
            login,
            password: hash,
            name
          })
            .then(user => {
              res.json({
                ok: true
              });
            })
            .catch(err => {
              console.log(err);
              res.json({
                ok: false,
                error: "Ошибка попробуйте позже!"
              });
            });
        });
      }
    } else {
      console.log(user);
      res.json({
        ok: false,
        error: "Имя занято",
        fields: ["login"]
      });
    }
  });
});

module.exports = router;
