const express = require("express");
const router = express.Router();
const models = require("../../models");

/* GET task */
router.get("/:course/:lesson/tasks/:task", async (req, res, next) => {
  const id = req.session.userId;
  const login = req.session.userLogin;

  const courseURL = req.params.course;
  const course = await models.Course.findOne({ url: courseURL });
  const lessonURL = req.params.lesson;
  const lesson = await models.Lesson.findOne({ url: lessonURL });
  const taskURL = req.params.task;
  const task = await models.Task.findOne({ url: taskURL });

  if (!course || !lesson || !task) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else if (
    !course.published &&
    (!userLogin || !userId || userId != course.owner)
  ) {
    res.redirect("/");
  } else {
    res.render("course/task", {
      title: course.title,
      course,
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
