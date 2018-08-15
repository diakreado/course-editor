const express = require("express");
const router = express.Router();
const models = require("../models");

/* GET Create project */
router.get("/create-project", async (req, res) => {
  const login = req.session.userLogin;
  const userId = req.session.userId;

  if (!login || !userId) {
    res.redirect("/");
  } else {
    const title = "Добавить курс";
    res.render("create/create-project", {
      title
    });
  }
});

/* POST Create project */
router.post("/create-project", async (req, res) => {
  const login = req.session.userLogin;
  const userId = req.session.userId;

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
});

// GET Edit project
router.get("/:project", async (req, res, next) => {
  const login = req.session.userLogin;
  const userId = req.session.userId;

  const projectURL = req.params.project;
  const project = await models.Project.findOne({ url: projectURL });

  if (!project) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else if (!login || !userId || userId != project.owner) {
    res.redirect("/");
  } else {
    const lessons = await models.Lesson.find({ curse: project.id });
    const title = "Редактирование курса";
    res.render("create/edit-project", {
      title,
      project,
      lessons
    });
  }
});

// GET Create lesson
router.get("/:project/create-lesson", async (req, res) => {
  const login = req.session.userLogin;
  const userId = req.session.userId;

  const projectURL = req.params.project;
  const project = await models.Project.findOne({ url: projectURL });

  if (!project) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else if (!login || !userId || userId != project.owner) {
    res.redirect("/");
  } else {
    res.render("create/create-lesson", {
      title: project.title
    });
  }
});

// POST Create lesson
router.post("/:project/create-lesson", async (req, res) => {
  const login = req.session.userLogin;
  const userId = req.session.userId;

  const projectURL = req.params.project;
  const project = await models.Project.findOne({ url: projectURL });

  if (!project) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else if (!login || !userId || userId != project.owner) {
    res.redirect("/");
  } else {
    const { title, number, discripiton, logo, duration } = req.body;

    const lesson = await models.Lesson.create({
      curse: project.id,
      title,
      number,
      discripiton,
      logo,
      duration
    });

    res.redirect("/create/" + projectURL + "/lessons/" + lesson.url);
  }
});

// GET Edit lesson
router.get("/:project/lessons/:lesson", async (req, res) => {
  const login = req.session.userLogin;
  const userId = req.session.userId;

  const projectURL = req.params.project;
  const project = await models.Project.findOne({ url: projectURL });
  const lessonURL = req.params.lesson;
  const lesson = await models.Lesson.findOne({ url: lessonURL });

  if (!project || !lesson) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else if (!login || !userId || userId != project.owner) {
    res.redirect("/");
  } else {
    const tasks = await models.Task.find({ lesson: lesson.id });
    const title = "Редактирование урока";

    res.render("create/edit-lesson", {
      title,
      project,
      lesson,
      tasks
    });
  }
});

// GET Create task
router.get("/:project/:lesson/create-task", async (req, res) => {
  const login = req.session.userLogin;
  const userId = req.session.userId;

  const projectURL = req.params.project;
  const project = await models.Project.findOne({ url: projectURL });
  const lessonURL = req.params.lesson;
  const lesson = await models.Lesson.findOne({ url: lessonURL });

  if (!project || !lesson) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else if (!login || !userId || userId != project.owner) {
    res.redirect("/");
  } else {
    res.render("create/create-task", {
      title: project.title,
      project,
      lesson
    });
  }
});

// POST Create task
router.post("/:project/:lesson/create-task", async (req, res) => {
  const login = req.session.userLogin;
  const userId = req.session.userId;

  const projectURL = req.params.project;
  const project = await models.Project.findOne({ url: projectURL });
  const lessonURL = req.params.lesson;
  const lesson = await models.Lesson.findOne({ url: lessonURL });

  if (!project || !lesson) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else if (!login || !userId || userId != project.owner) {
    res.redirect("/");
  } else {
    const { number, instructions, text, sound, pitch, textMarkup } = req.body;
    const task = await models.Task.create({
      lesson: lesson.id,
      number,
      instructions,
      text,
      sound,
      pitch,
      textMarkup
    });
    res.redirect("/create/" + projectURL + "/lessons/" + lesson.url);
  }
});

// GET Edit task
router.get("/:project/:lesson/tasks/:task", async (req, res) => {
  const login = req.session.userLogin;
  const userId = req.session.userId;

  const projectURL = req.params.project;
  const project = await models.Project.findOne({ url: projectURL });
  const lessonURL = req.params.lesson;
  const lesson = await models.Lesson.findOne({ url: lessonURL });
  const taskURL = req.params.task;
  const task = await models.Task.findOne({ url: taskURL });

  if (!project || !lesson) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else if (!login || !userId || userId != project.owner) {
    res.redirect("/");
  } else {
    const title = "Редактирование задачи";
    res.render("create/edit-task", {
      title,
      project,
      lesson,
      task
    });
  }
});

module.exports = router;
