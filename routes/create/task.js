const express = require("express");
const router = express.Router();
const models = require("../../models");

// GET Create task
router.get("/:lessonId", async (req, res, next) => {
  const userLogin = req.session.userLogin;
  const userId = req.session.userId;

  const lessonId = req.params.lessonId;
  if (!lessonId.match(/^[0-9a-fA-F]{24}$/)) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else {
    const lesson = await models.Lesson.findById(lessonId);
    const course = await models.Course.findById(lesson.course);
    if (!lesson || !course) {
      var err = new Error("Not Found");
      err.status = 404;
      next(err);
    } else if (!userLogin || !userId || userId != course.owner) {
      res.redirect("/");
    } else {
      res.render("create/task", {
        title: course.title,
        course,
        lesson
      });
    }
  }
});

// POST Create task
router.post("/", async (req, res, next) => {
  const userLogin = req.session.userLogin;
  const userId = req.session.userId;

  const lessonId = req.body.lessonId;
  const lesson = await models.Lesson.findById(lessonId);
  const course = await models.Course.findById(lesson.course);

  if (!course || !lesson) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else if (!userLogin || !userId || userId != course.owner) {
    res.redirect("/");
  } else {
    const { number, instructions, text, sound } = req.body;
    const task = await models.Task.create({
      lesson: lesson.id,
      number,
      instructions,
      text,
      sound,
      pitch: "void"
    });

    res.json({
      ok: true,
      url: "/edit/task/" + task.id
    });
  }
});

module.exports = router;
