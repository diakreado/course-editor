const express = require("express");
const router = express.Router();
const models = require("../../models");

// GET Create task
router.get("/:project/:lesson/create-task", async (req, res, next) => {
  const login = req.session.userLogin;
  const userId = req.session.userId;

  const projectURL = req.params.project;
  const project = await models.Project.findOne({ url: projectURL });
  const lessonURL = req.params.lesson;
  const lesson = await models.Lesson.findOne({ url: lessonURL });

  if (!project || !lesson) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else if (!login || !userId || userId != project.owner) {
    res.redirect("/");
  } else {
    res.render("create/create-task", {
      title: project.title,
      project,
      lesson
    });
  }
});

// POST Create task
router.post("/:project/:lesson/create-task", async (req, res, next) => {
  const login = req.session.userLogin;
  const userId = req.session.userId;

  const projectURL = req.params.project;
  const project = await models.Project.findOne({ url: projectURL });
  const lessonURL = req.params.lesson;
  const lesson = await models.Lesson.findOne({ url: lessonURL });

  if (!project || !lesson) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else if (!login || !userId || userId != project.owner) {
    res.redirect("/");
  } else {
    const { number, instructions, text, sound, pitch, textMarkup } = req.body;
    const task = await models.Task.create({
      lesson: lesson.id,
      number,
      instructions,
      text,
      sound,
      pitch,
      textMarkup
    });
    res.redirect("/create/" + projectURL + "/lessons/" + lesson.url);
  }
});

module.exports = router;
