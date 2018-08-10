const express = require("express");
const router = express.Router();

const config = require("../config.js");
const models = require("../models");

// Create project
router.get("/create-project", async function(req, res) {
  const login = req.session.userLogin;
  const userId = req.session.userId;
  try {
    if (!login || !userId) {
      res.redirect("/");
    } else {
      const title = "Добавить курс";
      res.render("create-project", {
        title
      });
    }
  } catch (error) {
    throw new Error("Server Error");
  }
});

// Create project
router.post("/create-project", async function(req, res) {
  const login = req.session.userLogin;
  const userId = req.session.userId;
  try {
    if (!login || !userId) {
      res.redirect("/");
    } else {
      const {
        title,
        discripiton,
        logo,
        complexity,
        category,
        authors
      } = req.body;
      const curse = await models.Project.create({
        title,
        discripiton,
        logo,
        complexity,
        category,
        authors,
        owner: userId
      });
      res.redirect("/create/" + curse.url);
    }
  } catch (error) {
    throw new Error("Server Error");
  }
});

// Edit project
router.get("/:project", async function(req, res) {
  const login = req.session.userLogin;
  const userId = req.session.userId;
  try {
    const projectURL = req.params.project;
    const project = await models.Project.findOne({ url: projectURL });

    if (!login || !userId || userId != project.owner) {
      res.redirect("/");
    } else {
      const lessons = await models.Lesson.find({ curse: project.id });

      res.render("edit-project", {
        title: project.title,
        project,
        lessons
      });
    }
  } catch (error) {
    throw new Error("Server Error");
  }
});

// Create lesson
router.get("/:project/create-lesson", async function(req, res) {
  const login = req.session.userLogin;
  const userId = req.session.userId;
  try {
    const projectURL = req.params.project;
    const project = await models.Project.findOne({ url: projectURL });

    if (!login || !userId || userId != project.owner) {
      res.redirect("/");
    } else {
      res.render("create-lesson", {
        title: project.title
      });
    }
  } catch (error) {
    throw new Error("Server Error");
  }
});

// Create lesson
router.post("/:project/create-lesson", async function(req, res) {
  const login = req.session.userLogin;
  const userId = req.session.userId;
  const projectURL = req.params.project;
  const project = await models.Project.findOne({ url: projectURL });

  if (!login || !userId || userId != project.owner) {
    res.redirect("/");
  } else {
    const { title, id, discripiton, logo, duration } = req.body;

    const lesson = await models.Lesson.create({
      curse: project.id,
      title,
      id,
      discripiton,
      logo,
      duration
    });

    res.redirect("/create/" + projectURL + "/" + lesson.url);
  }
});

// Edit lesson
router.get("/:project/:lesson", async function(req, res) {
  const login = req.session.userLogin;
  const userId = req.session.userId;
  try {
    const projectURL = req.params.project;
    const project = await models.Project.findOne({ url: projectURL });
    const lessonURL = req.params.lesson;
    const lesson = await models.Lesson.findOne({ url: lessonURL });

    if (!login || !userId || userId != project.owner) {
      res.redirect("/");
    } else {
      res.render("edit-lesson", {
        title: project.title
      });
    }
  } catch (error) {
    throw new Error("Server Error");
  }
});

module.exports = router;
