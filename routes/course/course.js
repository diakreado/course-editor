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

/* GET course */
router.get("/json/:courseId", async (req, res, next) => {
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
      const outputJSON = {
        id: course.id,
        title: course.title,
        description: course.description,
        difficulty: course.complexity,
        category: course.category,
        authors: course.authors,
        releaseDate: course.createdAt,
        lessons: []
      };

      const lessons = await models.Lesson.find({ course: course.id });
      lessons.forEach(lesson => {
        lessonJSON = {
          id: lesson.id,
          title: lesson.title,
          description: lesson.description,
          duration: lesson.duration,
          tasks: []
        };

        outputJSON.lessons.push(lessonJSON);
      });

      for (var i = 0, len = lessons.length; i < len; i++) {
        const tasks = await models.Task.find({
          lesson: outputJSON.lessons[i].id
        });

        if (tasks.length) {
          taskJSON = {
            id: tasks[i].id,
            instructions: tasks[i].instructions,
            text: tasks[i].text
          };

          outputJSON.lessons[i].tasks.push(taskJSON);
        }
      }

      res.send(outputJSON);
    }
  }
});

module.exports = router;
