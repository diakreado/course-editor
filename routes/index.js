const express = require("express");
const router = express.Router();

const config = require("../config.js");

const models = require("../models");

/* GET home page. */
router.get("/", function(req, res) {
  models.Project.find({}).then(projects => {
    res.render("index", {
      title: config.NAME_OF_PROJECT,
      items: projects
    });
  });
});

module.exports = router;
