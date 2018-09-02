const express = require("express");
const router = express.Router();

const config = require("../config.js");

const models = require("../models");

/* GET home page. */
router.get("/", async (req, res) => {
  try {
    const courses = await models.Course.find({}).sort({ createdAt: -1 });

    const id = req.session.userId;
    const login = req.session.userLogin;

    res.render("index", {
      title: config.NAME_OF_PROJECT,
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
