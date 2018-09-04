const express = require("express");
const router = express.Router();
const models = require("../../models");

/* GET edit course */
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
      const lessons = await models.Lesson.find({ curse: course.id });
      const title = "Редактирование курса";
      res.render("edit/course", {
        title,
        course,
        lessons
      });
    }
  }
});

/* POST Edit course */
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
    let {
      title,
      discripiton,
      logo,
      complexity,
      category,
      authors,
      published
    } = req.body;

    if (logo == "") {
      logo = course.logo;
    }

    const newCourse = await models.Course.findOneAndUpdate(
      {
        _id: course.id,
        owner: userId
      },
      {
        title,
        discripiton,
        logo,
        complexity,
        category,
        authors,
        owner: userId,
        published
      },
      { new: true }
    );

    if (!newCourse) {
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

/* DELETE edit course */
router.delete("/", async (req, res, next) => {
  const userLogin = req.session.userLogin;
  const userId = req.session.userId;

  console.log("DELETE edit course");

  const courseId = req.body.id;
  const course = await models.Course.findById(courseId);
  if (!course) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else if (!userLogin || !userId || userId != course.owner) {
    res.redirect("/");
  } else {
    const removedCourse = await models.Course.findByIdAndRemove(course.id);

    if (!removedCourse) {
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
