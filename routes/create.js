const express = require("express");
const router = express.Router();
const models = require("../models");

/* GET Create project */
router.get("/create-project", async function(req, res) {
  const login = req.session.userLogin;
  const userId = req.session.userId;
  try {
    if (!login || !userId) {
      res.redirect("/");
    } else {
      const title = "Добавить курс";
      res.render("create/create-project", {
        title
      });
    }
  } catch (error) {
    throw new Error("Server Error");
  }
});

/* POST Create project */
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

// GET Edit project
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
      const title = "Редактирование курса";
      res.render("create/edit-project", {
        title,
        project,
        lessons
      });
    }
  } catch (error) {
    throw new Error("Server Error");
  }
});

// GET Create lesson
router.get("/:project/create-lesson", async function(req, res) {
  const login = req.session.userLogin;
  const userId = req.session.userId;
  try {
    const projectURL = req.params.project;
    const project = await models.Project.findOne({ url: projectURL });

    if (!login || !userId || userId != project.owner) {
      res.redirect("/");
    } else {
      res.render("create/create-lesson", {
        title: project.title
      });
    }
  } catch (error) {
    throw new Error("Server Error");
  }
});

// POST Create lesson
router.post("/:project/create-lesson", async function(req, res) {
  const login = req.session.userLogin;
  const userId = req.session.userId;

  try {
    const projectURL = req.params.project;
    const project = await models.Project.findOne({ url: projectURL });

    if (!login || !userId || userId != project.owner) {
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
  } catch (error) {
    throw new Error("Server Error");
  }
});

// GET Edit lesson
router.get("/:project/lessons/:lesson", async function(req, res) {
  const login = req.session.userLogin;
  const userId = req.session.userId;
  try {
    const projectURL = req.params.project;
    const project = await models.Project.findOne({ url: projectURL });
    const lessonURL = req.params.lesson;
    const lesson = await models.Lesson.findOne({ url: lessonURL });
    const tasks = await models.Task.find({ lesson: lesson.id });

    if (!login || !userId || userId != project.owner) {
      res.redirect("/");
    } else {
      const title = "Редактирование урока";
      res.render("create/edit-lesson", {
        title,
        project,
        lesson,
        tasks
      });
    }
  } catch (error) {
    throw new Error("Server Error");
  }
});

// GET Create task
router.get("/:project/:lesson/create-task", async function(req, res) {
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
      res.render("create/create-task", {
        title: project.title,
        project,
        lesson
      });
    }
  } catch (error) {
    throw new Error("Server Error");
  }
});

// POST Create task
router.post("/:project/:lesson/create-task", async function(req, res) {
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
  } catch (error) {
    throw new Error("Server Error");
  }
});

// GET Edit task
router.get("/:project/:lesson/tasks/:task", async function(req, res) {
  const login = req.session.userLogin;
  const userId = req.session.userId;
  try {
    const projectURL = req.params.project;
    const project = await models.Project.findOne({ url: projectURL });
    const lessonURL = req.params.lesson;
    const lesson = await models.Lesson.findOne({ url: lessonURL });
    const taskURL = req.params.task;
    const task = await models.Task.findOne({ url: taskURL });

    if (!login || !userId || userId != project.owner) {
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
  } catch (error) {
    throw new Error("Server Error");
  }
});

module.exports = router;
