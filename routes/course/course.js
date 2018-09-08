const express = require("express");
const router = express.Router();
const models = require("../../models");

/* GET course */
router.get("/:courseId", async (req, res, next) => {
  const userLogin = req.session.userLogin;
  const userId = req.session.userId;

  const courseId = req.params.courseId;

  if (!courseId.match(/^[0-9a-fA-F]{24}$/)) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else {
    const course = await models.Course.findById(courseId);

    if (!course) {
      var err = new Error("Not Found");
      err.status = 404;
      next(err);
    } else if (
      !course.published &&
      (!userLogin || !userId || userId != course.owner)
    ) {
      res.redirect("/");
    } else {
      const lessons = await models.Lesson.find({ course: course.id });

      res.render("course/course", {
        title: course.title,
        course,
        user: {
          id: userId,
          login: userLogin
        },
        lessons
      });
    }
  }
});

module.exports = router;
