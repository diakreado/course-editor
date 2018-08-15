const express = require("express");
const router = express.Router();

const config = require("../config.js");

const models = require("../models");

/* GET home page. */
router.get("/", async (req, res) => {
  try {
    const userId = req.session.userId;
    const projects = await models.Project.find({ owner: userId }).sort({
      createdAt: -1
    });

    const id = req.session.userId;
    const login = req.session.userLogin;

    res.render("user-projects", {
      title: config.NAME_OF_PROJECT,
      projects: projects,
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
