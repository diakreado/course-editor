const express = require("express");
const router = express.Router();

const course = require("../routes/create/course"); // i don't know why it doesn't work otherwise
const lesson = require("../routes/create/lesson");
const task = require("../routes/create/task");

router.use("/course", course);
router.use("/lesson", lesson);
router.use("/task", task);

module.exports = router;
