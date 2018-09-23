const express = require("express");
const router = express.Router();
const models = require("../../models");

// const fs = require("fs");
// const WavDecoder = require("wav-decoder");
// const Pitchfinder = require("pitchfinder");

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

    // see below for optional constructor parameters.
    // const detectPitch = new Pitchfinder.YIN();

    // const buffer = fs.readFileSync("uploads/" + task.sound);
    // const decoded = WavDecoder.decode.sync(buffer); // get audio data from file using `wav-decoder`
    // const float32Array = decoded.channelData[0]; // get a single channel of sound
    // const pitch = detectPitch(float32Array); // null if pitch cannot be identified

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
