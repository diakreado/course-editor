const express = require("express");
const router = express.Router();

const models = require("../models");

/* GET page with my course */
router.get("/", async (req, res) => {
  try {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;

    const courses = await models.Course.find({ owner: userId }).sort({
      createdAt: -1
    });

    if (!userLogin || !userId) {
      res.redirect("/");
    } else {
      res.render("my-courses", {
        title: "Мои проекты",
        courses,
        user: {
          id: userId,
          login: userLogin
        }
      });
    }
  } catch (error) {
    throw new Error("Server Error");
  }
});

module.exports = router;
