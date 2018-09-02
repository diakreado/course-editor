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
