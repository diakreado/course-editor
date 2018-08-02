const express = require("express");
const router = express.Router();
const config = require("../config.js");
const models = require("../models");
const bcrypt = require("bcrypt-nodejs");

// Registration
router.get("/registration", function(req, res) {
  res.render("registration", {
    title: config.NAME_OF_PROJECT
  });
});

router.post("/registration", function(req, res) {
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
              req.session.userId = user.id;
              req.session.userLogin = user.login;
              req.session.userName = user.name;
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

// Login
router.post("/login", function(req, res) {
  const { login, password } = req.body;

  if (!login || !password) {
    const fields = [];
    if (!login) fields.push("login");
    if (!password) fields.push("password");

    res.json({
      ok: false,
      error: "Все поля должны быть заполнены!",
      fields
    });
  } else {
    models.User.findOne({
      login
    })
      .then(user => {
        if (!user) {
          res.json({
            ok: false,
            error: "Логин или пароль не совпадают",
            fields: ["login", "password"]
          });
        } else {
          // Load hash from your password DB.
          bcrypt.compare(password, user.password, function(err, result) {
            if (result) {
              req.session.userId = user.id;
              req.session.userLogin = user.login;
              req.session.userName = user.name;

              res.json({
                ok: true
              });
            } else {
              res.json({
                ok: false,
                error: "Логин или пароль не совпадают",
                fields: ["login", "password"]
              });
            }
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.json({
          ok: false,
          error: "Ошибка попробуйте позже!"
        });
      });
  }
});

// Logout
router.get("/logout", function(req, res) {
  if (req.session) {
    req.session.destroy(() => {
      res.redirect("/");
    });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
