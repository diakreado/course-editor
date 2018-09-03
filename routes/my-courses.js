const express = require("express");
const router = express.Router();

const models = require("../models");

/* GET page with my course */
router.get("/", async (req, res) => {
  try {
    const userId = req.session.userId;
    const courses = await models.Course.find({ owner: userId }).sort({
      createdAt: -1
    });

    const id = req.session.userId;
    const login = req.session.userLogin;

    res.render("my-courses", {
      title: "Мои проекты",
      courses,
      user: {
        id,
        login
      }
    });
  } catch (error) {
    throw new Error("Server Error");
  }
});

module.exports = router;
