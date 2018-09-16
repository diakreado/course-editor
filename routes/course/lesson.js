const express = require("express");
const router = express.Router();
const models = require("../../models");

/* GET lesson */
router.get("/:lessonId", async (req, res, next) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;

  const lessonId = req.params.lessonId;

  if (!lessonId.match(/^[0-9a-fA-F]{24}$/)) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else {
    const lesson = await models.Lesson.findById(lessonId);
    const course = await models.Course.findById(lesson.course);

    if (!course || !lesson) {
      var err = new Error("Not Found");
      err.status = 404;
      next(err);
    } else if (
      !course.published &&
      (!userLogin || !userId || userId != course.owner)
    ) {
      res.redirect("/");
    } else {
      const tasks = await models.Task.find({ lesson: lesson.id });

      res.render("course/lesson", {
        title: course.title,
        course,
        user: {
          id: userId,
          login: userLogin
        },
        lesson,
        tasks
      });
    }
  }
});

module.exports = router;
