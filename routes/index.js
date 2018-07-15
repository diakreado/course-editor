var express = require('express');
var router = express.Router();

var config = require('../config.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: config.name_of_project });
});


module.exports = router;
