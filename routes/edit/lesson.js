const express = require("express");
const router = express.Router();
const models = require("../../models");

/* GET Edit lesson */
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

    if (!course || !lesson) {
      var err = new Error("Not Found");
      err.status = 404;
      next(err);
    } else if (!userLogin || !userId || userId != course.owner) {
      res.redirect("/");
    } else {
      const tasks = await models.Task.find({ lesson: lesson.id }).sort({
        number: 1
      });
      const title = "Редактирование урока";

      res.render("edit/lesson", {
        title,
        course,
        lesson,
        tasks
      });
    }
  }
});

/* POST Edit lesson */
router.post("/", async (req, res, next) => {
  const userLogin = req.session.userLogin;
  const userId = req.session.userId;

  const lessonId = req.body.id;
  const lesson = await models.Lesson.findById(lessonId);
  const course = await models.Course.findById(lesson.course);

  if (!course || !lesson) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else if (!userLogin || !userId || userId != course.owner) {
    res.redirect("/");
  } else {
    const { title, number, discripiton, duration } = req.body;
    const newLesson = await models.Lesson.findOneAndUpdate(
      {
        _id: lesson.id,
        curse: course.id
      },
      {
        title,
        number,
        discripiton,
        duration
      },
      { new: true }
    );

    if (!newLesson) {
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

/* DELETE edit lesson */
router.delete("/", async (req, res, next) => {
  const userLogin = req.session.userLogin;
  const userId = req.session.userId;

  const lessonId = req.body.id;
  const lesson = await models.Lesson.findById(lessonId);
  const course = await models.Course.findById(lesson.course);
  if (!course) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else if (!userLogin || !userId || userId != course.owner) {
    res.redirect("/");
  } else {
    const removedTasks = await models.Task.remove({ lesson: lesson.id });
    const removedLesson = await models.Lesson.findByIdAndRemove(lesson.id);

    if (!removedLesson || !removedTasks.ok) {
      res.json({
        ok: false,
        error: "Что-то пошло не так"
      });
    } else {
      res.json({
        ok: true,
        url: "/edit/course/" + course.id
      });
    }
  }
});

module.exports = router;
