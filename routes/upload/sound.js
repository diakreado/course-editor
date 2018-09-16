const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const config = require("../../config");
const models = require("../../models");

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, config.DESTINATION);
  },
  filename: async (req, file, cd) => {
    const userLogin = req.session.userLogin;
    const userId = req.session.userId;

    const taskId = req.body.taskId;
    const task = await models.Task.findById(taskId);
    const lesson = await models.Lesson.findById(task.lesson);
    const course = await models.Course.findById(lesson.course);

    if (!course || !lesson || !task) {
      var err = new Error("Not Found");
      err.code = "NOCOURSE";
      cd(err);
    } else if (!userLogin || !userId || userId != course.owner) {
      var err = new Error("Is not allowed");
      err.code = "NOTALLOWED";
      cd(err);
    } else {
      const filePath = Date.now() + path.extname(file.originalname);
      const newTask = await models.Task.findOneAndUpdate(
        {
          _id: task.id,
          lesson: lesson.id
        },
        {
          sound: filePath,
          pitch: "void"
        },
        { new: true }
      );

      cd(null, filePath);
    }
  }
});

const upload = multer({ storage }).single("file");

/* POST add image */
router.post("/", (req, res) => {
  upload(req, res, err => {
    res.json({
      ok: !err
    });
  });
});

/* GET image path */
router.get("/", async (req, res, next) => {
  const taskId = req.query.id;

  if (!taskId.match(/^[0-9a-fA-F]{24}$/)) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else {
    const task = await models.Task.findById(taskId);

    res.json({
      path: task.sound
    });
  }
});

module.exports = router;
