const express = require("express");
const router = express.Router();

const models = require("../models");

/* GET home page. */
router.get("/", async (req, res) => {
  try {
    const id = req.session.userId;
    const login = req.session.userLogin;

    const courses = await models.Course.find({ published: true }).sort({
      createdAt: -1
    });

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
