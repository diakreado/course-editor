const express = require("express");
const router = express.Router();

const config = require("../config.js");

const models = require("../models");

/* GET home page. */
router.get("/:project_name", async function(req, res) {
  try {
    const project_name = req.params.project_name;
    const project = await models.Project.findOne({ url: project_name }).sort({
      createdAt: -1
    });

    const name = req.session.userName;
    const id = req.session.userId;

    res.render("project", {
      title: config.NAME_OF_PROJECT,
      project: project,
      user: {
        id: id,
        name: name
      }
    });
  } catch (error) {
    throw new Error("Server Error");
  }
});

module.exports = router;
