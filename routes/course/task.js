const express = require("express");
const router = express.Router();
const models = require("../../models");

/* GET task */
router.get("/:taskId", async (req, res, next) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;

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
          id: userId,
          login: userLogin
        },
        lesson,
        task
      });
    }
  }
});

module.exports = router;
