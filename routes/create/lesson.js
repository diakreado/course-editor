const express = require("express");
const router = express.Router();
const models = require("../../models");

// GET Create lesson
router.get("/:course/create-lesson", async (req, res, next) => {
  const login = req.session.userLogin;
  const userId = req.session.userId;

  const courseURL = req.params.project;
  const course = await models.Course.findOne({ url: courseURL });

  if (!course) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else if (!login || !userId || userId != course.owner) {
    res.redirect("/");
  } else {
    res.render("create/create-lesson", {
      title: course.title
    });
  }
});

// POST Create lesson
router.post("/:course/create-lesson", async (req, res, next) => {
  const login = req.session.userLogin;
  const userId = req.session.userId;

  const courseURL = req.params.project;
  const course = await models.Course.findOne({ url: courseURL });

  if (!course) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else if (!login || !userId || userId != course.owner) {
    res.redirect("/");
  } else {
    const { title, number, discripiton, logo, duration } = req.body;

    const lesson = await models.Lesson.create({
      curse: course.id,
      title,
      number,
      discripiton,
      logo,
      duration
    });

    res.redirect("/create/" + courseURL + "/lessons/" + lesson.url);
  }
});

module.exports = router;
