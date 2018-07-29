var express = require("express");
var router = express.Router();

const config = require("../config.js");
const index = require("./index.js");

const models = require("../models");

/* GET home page. */
router.get("/", function(req, res) {
  res.render("create", { title: config.NAME_OF_PROJECT });
});

router.post("/", function(req, res) {
  const { title, discripiton, logo, complexity, category } = req.body;

  console.log(logo, complexity, category);

  models.Project.create({
    title: title,
    discripiton: discripiton
  }).then(post => console.log(post.id));

  res.redirect("/");
});

module.exports = router;
