const express = require("express");
const router = express.Router();

const config = require("../config.js");

const models = require("../models");

/* GET project */
router.get("/:project", async function(req, res) {
  try {
    const projectName = req.params.project;
    const project = await models.Project.findOne({ url: projectName });

    const id = req.session.userId;
    const login = req.session.userLogin;

    const lessons = await models.Lesson.find({ curse: project.id });

    res.render("project/project", {
      title: project.title,
      project: project,
      user: {
        id,
        login
      },
      lessons
    });
  } catch (error) {
    throw new Error("Server Error");
  }
});

/* GET lesson */
router.get("/:project/lessons/:lesson", async function(req, res) {
  try {
    const projectURL = req.params.project;
    const project = await models.Project.findOne({ url: projectURL });
    const lessonURL = req.params.lesson;
    const lesson = await models.Lesson.findOne({ url: lessonURL });

    const id = req.session.userId;
    const login = req.session.userLogin;

    res.render("project/lesson", {
      title: project.title,
      project: project,
      user: {
        id,
        login
      },
      lesson
    });
  } catch (error) {
    throw new Error("Server Error");
  }
});

module.exports = router;
