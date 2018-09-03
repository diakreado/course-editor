const express = require("express");
const router = express.Router();
const models = require("../models");

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
    } else {
      const lessons = await models.Lesson.find({ curse: course.id });

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

/* GET lesson */
router.get("/:courses/lessons/:lesson", async (req, res, next) => {
  const id = req.session.userId;
  const login = req.session.userLogin;

  const courseURL = req.params.project;
  const course = await models.Course.findOne({ url: courseURL });
  const lessonURL = req.params.lesson;
  const lesson = await models.Lesson.findOne({ url: lessonURL });

  if (!course || !lesson) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else {
    const tasks = await models.Task.find({ lesson: lesson.id });

    res.render("courses/lesson", {
      title: course.title,
      course,
      user: {
        id,
        login
      },
      lesson,
      tasks
    });
  }
});

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
  } else {
    res.render("courses/task", {
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
