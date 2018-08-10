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
