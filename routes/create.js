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

    if (
      !title ||
      !discripiton ||
      !logo ||
      !complexity ||
      !category ||
      !authors
    ) {
      const fields = [];
      if (!title) fields.push("title");
      if (!discripiton) fields.push("discripiton");
      if (!logo) fields.push("logo");
      if (!complexity) fields.push("complexity");
      if (!category) fields.push("category");
      if (!authors) fields.push("authors");

      res.json({
        ok: false,
        error: "Все поля должны быть заполнены!",
        fields
      });
    } else {
      const curse = await models.Project.create({
        title,
        discripiton,
        logo,
        complexity,
        category,
        authors,
        owner: userId
      });

      res.json({
        ok: true,
        url: "/create/" + curse.url
      });
    }
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

// POST Edit project
router.post("/:project", async (req, res, next) => {
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
    let { title, discripiton, logo, complexity, category, authors } = req.body;

    if (logo == "") {
      logo = project.logo;
    }

    const newProject = await models.Project.findOneAndUpdate(
      {
        _id: project.id,
        owner: userId
      },
      {
        title,
        discripiton,
        logo,
        complexity,
        category,
        authors,
        owner: userId
      },
      { new: true }
    );

    if (!newProject) {
      res.json({
        ok: false,
        error: "Что-то пошло не так"
      });
    } else {
      res.json({
        ok: true
      });
    }
  }
});

// GET Create lesson
router.get("/:project/create-lesson", async (req, res, next) => {
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
router.post("/:project/create-lesson", async (req, res, next) => {
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
router.get("/:project/lessons/:lesson", async (req, res, next) => {
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

// POST Edit lesson
router.post("/:project/lessons/:lesson", async (req, res, next) => {
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
    let { title, number, discripiton, logo, duration } = req.body;

    if (logo == "") {
      logo = project.logo;
    }

    const newLesson = await models.Lesson.findOneAndUpdate(
      {
        _id: lesson.id,
        curse: project.id
      },
      {
        title,
        number,
        discripiton,
        logo,
        duration
      },
      { new: true }
    );

    if (!newLesson) {
      res.json({
        ok: false,
        error: "Что-то пошло не так"
      });
    } else {
      res.json({
        ok: true
      });
    }
  }
});

// GET Create task
router.get("/:project/:lesson/create-task", async (req, res, next) => {
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
router.post("/:project/:lesson/create-task", async (req, res, next) => {
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
router.get("/:project/:lesson/tasks/:task", async (req, res, next) => {
  const login = req.session.userLogin;
  const userId = req.session.userId;

  const projectURL = req.params.project;
  const project = await models.Project.findOne({ url: projectURL });
  const lessonURL = req.params.lesson;
  const lesson = await models.Lesson.findOne({ url: lessonURL });
  const taskURL = req.params.task;
  const task = await models.Task.findOne({ url: taskURL });

  if (!project || !lesson || !task) {
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

// POST Edit task
router.post("/:project/:lesson/tasks/:task", async (req, res, next) => {
  const login = req.session.userLogin;
  const userId = req.session.userId;

  const projectURL = req.params.project;
  const project = await models.Project.findOne({ url: projectURL });
  const lessonURL = req.params.lesson;
  const lesson = await models.Lesson.findOne({ url: lessonURL });
  const taskURL = req.params.task;
  const task = await models.Task.findOne({ url: taskURL });

  if (!project || !lesson || !task) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else if (!login || !userId || userId != project.owner) {
    res.redirect("/");
  } else {
    const { number, instructions, text } = req.body;

    const newTask = await models.Task.findOneAndUpdate(
      {
        _id: task.id,
        lesson: lesson.id
      },
      {
        number,
        instructions,
        text
      },
      { new: true }
    );

    if (!newTask) {
      res.json({
        ok: false,
        error: "Что-то пошло не так"
      });
    } else {
      res.json({
        ok: true
      });
    }
  }
});

module.exports = router;
