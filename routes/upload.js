const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const config = require("../config");
const models = require("../models");

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, config.DESTINATION);
  },
  filename: async (req, file, cd) => {
    const userLogin = req.session.userLogin;
    const userId = req.session.userId;

    const courseId = req.body.courseId;
    const course = await models.Course.findById(courseId);

    if (!course) {
      var err = new Error("Not Found");
      err.status = 404;
      next(err);
    } else if (!userLogin || !userId || userId != course.owner) {
      res.redirect("/");
    } else {
      const filePath = Date.now() + path.extname(file.originalname);
      const newCourse = await models.Course.findOneAndUpdate(
        {
          _id: course.id,
          owner: userId
        },
        {
          logo: filePath
        },
        { new: true }
      );

      cd(null, filePath);
    }
  }
});

const upload = multer({
  storage,
  // limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cd) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      const err = new Error("Extention");
      err.code = "EXTENTION";
      return cd(err);
    }
    cd(null, true);
  }
}).single("file");

/* POST is add */
router.post("/image", (req, res) => {
  upload(req, res, err => {
    let error = "";
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        error = "Картинка не более 1mb!";
      }
      if (err.code === "EXTENTION") {
        error = "Только jpeg и png!";
      }
    }

    res.json({
      ok: !err,
      error
    });
  });
});

module.exports = router;
