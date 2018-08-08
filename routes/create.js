const express = require("express");
const router = express.Router();

const config = require("../config.js");
const models = require("../models");

var lessons = [];

router.get("/create-project", async function(req, res) {
  const name = req.session.userName;
  const userId = req.session.userId;

  if (!name || !userId) {
    res.redirect("/");
  } else {
    try {
      const projects = await models.Project.find({});

      const name = req.session.userName;
      const title = config.NAME_OF_PROJECT;

      res.render("create-project", {
        title,
        name,
        lessons
      });
    } catch (error) {
      throw new Error("Server Error");
    }
  }
});

router.post("/create-project", async function(req, res) {
  const { title, discripiton, logo, complexity, category } = req.body;
  const name = req.session.userName;
  const userId = req.session.userId;

  if (name && userId) {
    try {
      const post = await models.Project.create({
        title,
        discripiton,
        complexity,
        category,
        author: name,
        owner: userId
      });
      console.log(post.id);
    } catch (error) {
      throw new Error("Server Error");
    }
  }
  res.redirect("/");
});

router.get("/create-lesson", async function(req, res) {
  const name = req.session.userName;
  const userId = req.session.userId;

  if (!name || !userId) {
    res.redirect("/");
  } else {
    try {
      const projects = await models.Project.find({});

      res.render("create-lesson", {
        title: config.NAME_OF_PROJECT,
        lessons: lessons
      });
    } catch (error) {
      throw new Error("Server Error");
    }
  }
});

router.post("/create-lesson", function(req, res) {
  const name = req.session.userName;
  const userId = req.session.userId;

  if (!name || !userId) {
    res.redirect("/");
  } else {
    const { title } = req.body;
    lesson = {
      title
    };
    lessons.push(lesson);
    res.redirect("/create/create-project");
  }
});

module.exports = router;
