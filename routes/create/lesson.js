const express = require("express");
const router = express.Router();
const models = require("../../models");

/* GET Create lesson */
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
    } else if (!userLogin || !userId || userId != course.owner) {
      res.redirect("/");
    } else {
      res.render("create/lesson", {
        title: course.title,
        course
      });
    }
  }
});

// POST Create lesson
router.post("/", async (req, res, next) => {
  const userLogin = req.session.userLogin;
  const userId = req.session.userId;

  const courseId = req.body.id;
  const course = await models.Course.findById(courseId);
  if (!course) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else if (!userLogin || !userId || userId != course.owner) {
    res.redirect("/");
  } else {
    const { title, number, discripiton, duration } = req.body;

    const lesson = await models.Lesson.create({
      course: course.id,
      title,
      number,
      discripiton,
      duration
    });

    res.json({
      ok: true,
      url: "/edit/lesson/" + lesson.id
    });
  }
});

module.exports = router;
