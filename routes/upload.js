const express = require("express");
const router = express.Router();

const image = require("../routes/upload/image"); // i don't know why it doesn't work otherwise
const sound = require("../routes/upload/sound");

router.use("/image", image);
router.use("/sound", sound);

module.exports = router;
