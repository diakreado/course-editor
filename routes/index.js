const express = require("express");
const router = express.Router();

const config = require("../config.js");

const models = require("../models");

/* GET home page. */
router.get("/", function(req, res) {
  models.Project.find({}).then(projects => {
    const name = req.session.userName;
    const id = req.session.userId;

    res.render("index", {
      title: config.NAME_OF_PROJECT,
      projects: projects,
      user: {
        id: id,
        name: name
      }
    });
  });
});

module.exports = router;
