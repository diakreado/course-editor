const express = require("express");
const router = express.Router();
const models = require("../../models");

/* GET Edit task */
router.get("/:taskId", async (req, res, next) => {
  const userLogin = req.session.userLogin;
  const userId = req.session.userId;

  const taskId = req.params.taskId;

  if (!taskId.match(/^[0-9a-fA-F]{24}$/)) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else {
    const task = await models.Task.findById(taskId);
    const lesson = await models.Lesson.findById(task.lesson);
    const course = await models.Course.findById(lesson.course);

    if (!course || !lesson || !task) {
      var err = new Error("Not Found");
      err.status = 404;
      next(err);
    } else if (!userLogin || !userId || userId != course.owner) {
      res.redirect("/");
    } else {
      const title = "Редактирование задачи";
      res.render("edit/task", {
        title,
        course,
        lesson,
        task
      });
    }
  }
});

/* POST Edit task */
router.post("/", async (req, res, next) => {
  const userLogin = req.session.userLogin;
  const userId = req.session.userId;

  const taskId = req.body.id;
  const task = await models.Task.findById(taskId);
  const lesson = await models.Lesson.findById(task.lesson);
  const course = await models.Course.findById(lesson.course);

  if (!course || !lesson) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else if (!userLogin || !userId || userId != course.owner) {
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

/* DELETE Edit task */
router.delete("/", async (req, res, next) => {
  const userLogin = req.session.userLogin;
  const userId = req.session.userId;

  const taskId = req.body.id;
  const task = await models.Task.findById(taskId);
  const lesson = await models.Lesson.findById(task.lesson);
  const course = await models.Course.findById(lesson.course);

  if (!course) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else if (!userLogin || !userId || userId != course.owner) {
    res.redirect("/");
  } else {
    const removedTask = await models.Task.findByIdAndRemove(task.id);

    if (!removedTask) {
      res.json({
        ok: false,
        error: "Что-то пошло не так"
      });
    } else {
      res.json({
        ok: true,
        url: "/edit/lesson/" + lesson.id
      });
    }
  }
});

module.exports = router;
