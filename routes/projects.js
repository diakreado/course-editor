const express = require("express");
const router = express.Router();

const config = require("../config.js");

const models = require("../models");

/* GET home page. */
router.get("/:project", async function(req, res) {
  try {
    const projectName = req.params.project;
    const project = await models.Project.findOne({ url: projectName }).sort({
      createdAt: -1
    });

    const id = req.session.userId;
    const login = req.session.userLogin;

    const lessons = await models.Lesson.find({ curse: project.id });

    res.render("project", {
      title: project.title,
      project: project,
      user: {
        id,
        name,
        login
      },
      lessons
    });
  } catch (error) {
    throw new Error("Server Error");
  }
});

module.exports = router;
