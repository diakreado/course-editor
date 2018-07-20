const express = require("express");
const router = express.Router();

const config = require("../config.js");

const Project = require("../models/project.js");

/* GET home page. */
router.get("/", function(req, res) {
  Project.find({}).then(projects => {
    res.render("index", {
      title: config.NAME_OF_PROJECT,
      items: projects
    });
  });
});

/* GET home page. */
router.get("/registration", function(req, res) {
  Project.find({}).then(projects => {
    res.render("reg", {
      title: config.NAME_OF_PROJECT
    });
  });
});

router.post("/registration", function(req, res) {
  const { fio, login, pass1, pass2 } = req.body;

  console.log(fio, login, pass1, pass2);

  res.redirect("/");
});

module.exports = router;
