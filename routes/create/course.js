const express = require("express");
const router = express.Router();
const models = require("../../models");

/* GET Create course */
router.get("/", async (req, res) => {
  const userLogin = req.session.userLogin;
  const userId = req.session.userId;

  if (!userLogin || !userId) {
    res.redirect("/");
  } else {
    const title = "Добавить курс";
    res.render("create/course", {
      title
    });
  }
});

/* POST Create course */
router.post("/", async (req, res) => {
  const userLogin = req.session.userLogin;
  const userId = req.session.userId;

  if (!userLogin || !userId) {
    res.redirect("/");
  } else {
    const {
      title,
      discripiton,
      logo,
      complexity,
      category,
      authors,
      published
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
      const curse = await models.Course.create({
        title,
        discripiton,
        logo,
        complexity,
        category,
        authors,
        owner: userId,
        published
      });

      res.json({
        ok: true,
        url: "/edit/course/" + curse.id
      });
    }
  }
});

module.exports = router;