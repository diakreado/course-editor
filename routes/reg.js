const express = require("express");
const router = express.Router();

const config = require("../config.js");

router.get("/", function(req, res) {
  res.render("reg", {
    title: config.NAME_OF_PROJECT
  });
});

router.post("/", function(req, res) {
  const { fio, login, pass1, pass2 } = req.body;

  console.log(fio, login, pass1, pass2);

  res.redirect("/");
});

module.exports = router;
