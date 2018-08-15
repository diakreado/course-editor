const express = require("express");
const router = express.Router();

const config = require("../config.js");

const models = require("../models");

/* GET project */
router.get("/:project", async (req, res, next) => {
  const id = req.session.userId;
  const login = req.session.userLogin;

  const projectName = req.params.project;
  const project = await models.Project.findOne({ url: projectName });

  if (!project) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else {
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
  }
});

/* GET lesson */
router.get("/:project/lessons/:lesson", async (req, res, next) => {
  const id = req.session.userId;
  const login = req.session.userLogin;

  const projectURL = req.params.project;
  const project = await models.Project.findOne({ url: projectURL });
  const lessonURL = req.params.lesson;
  const lesson = await models.Lesson.findOne({ url: lessonURL });

  if (!project || !lesson) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else {
    const tasks = await models.Task.find({ lesson: lesson.id });

    res.render("project/lesson", {
      title: project.title,
      project,
      user: {
        id,
        login
      },
      lesson,
      tasks
    });
  }
});

/* GET task */
router.get("/:project/:lesson/tasks/:task", async (req, res, next) => {
  const id = req.session.userId;
  const login = req.session.userLogin;

  const projectURL = req.params.project;
  const project = await models.Project.findOne({ url: projectURL });
  const lessonURL = req.params.lesson;
  const lesson = await models.Lesson.findOne({ url: lessonURL });
  const taskURL = req.params.task;
  const task = await models.Task.findOne({ url: taskURL });

  if (!project || !lesson || !task) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else {
    res.render("project/task", {
      title: project.title,
      project,
      user: {
        id,
        login
      },
      lesson,
      task
    });
  }
});

module.exports = router;
