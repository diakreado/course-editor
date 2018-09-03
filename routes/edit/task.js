const express = require("express");
const router = express.Router();
const models = require("../../models");

// GET Edit task
router.get("/:project/:lesson/tasks/:task", async (req, res, next) => {
  const login = req.session.userLogin;
  const userId = req.session.userId;

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
  } else if (!login || !userId || userId != project.owner) {
    res.redirect("/");
  } else {
    const title = "Редактирование задачи";
    res.render("create/edit-task", {
      title,
      project,
      lesson,
      task
    });
  }
});

// POST Edit task
router.post("/:project/:lesson/tasks/:task", async (req, res, next) => {
  const login = req.session.userLogin;
  const userId = req.session.userId;

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
  } else if (!login || !userId || userId != project.owner) {
    res.redirect("/");
  } else {
    const { number, instructions, text } = req.body;

    const newTask = await models.Task.findOneAndUpdate(
      {
        _id: task.id,
        lesson: lesson.id
      },
      {
        number,
        instructions,
        text
      },
      { new: true }
    );

    if (!newTask) {
      res.json({
        ok: false,
        error: "Что-то пошло не так"
      });
    } else {
      res.json({
        ok: true
      });
    }
  }
});

module.exports = router;
