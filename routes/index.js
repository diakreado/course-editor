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

module.exports = router;
