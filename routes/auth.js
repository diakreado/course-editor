const express = require("express");
const router = express.Router();
const config = require("../config.js");
const models = require("../models");
const bcrypt = require("bcrypt-nodejs");

// GET Registration
router.get("/registration", (req, res) => {
  res.render("registration", {
    title: config.NAME_OF_PROJECT
  });
});

// POST Registration
router.post("/registration", async (req, res) => {
  const { login, password, passwordConfirm } = req.body;
  try {
    const user = await models.User.findOne({ login });
    if (!user) {
      if (!login || !password || !passwordConfirm) {
        const fields = [];
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
        bcrypt.hash(password, null, null, async function(err, hash) {
          try {
            const newUser = await models.User.create({
              login,
              password: hash
            });

            req.session.userId = newUser.id;
            req.session.userLogin = newUser.login;

            res.json({
              ok: true
            });
          } catch (err) {
            console.log(err);
            res.json({
              ok: false,
              error: "Ошибка попробуйте позже!"
            });
          }
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
  } catch (error) {
    throw new Error("Server Error");
  }
});

// Login
router.post("/login", async (req, res) => {
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
    const user = await models.User.findOne({ login });
    try {
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
    } catch (err) {
      console.log(err);
      res.json({
        ok: false,
        error: "Ошибка попробуйте позже!"
      });
    }
  }
});

// Logout
router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      res.redirect(req.get("referer"));
    });
  } else {
    res.redirect(req.get("referer"));
  }
});

module.exports = router;
