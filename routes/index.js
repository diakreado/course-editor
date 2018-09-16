const express = require("express");
const router = express.Router();

const models = require("../models");

/* GET home page. */
router.get("/", async (req, res) => {
  try {
    const courses = await models.Course.find({ published: true }).sort({
      createdAt: -1
    });

    const id = req.session.userId;
    const login = req.session.userLogin;

    res.render("index", {
      title: "Редактор курсов",
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
