var express = require('express');
var router = express.Router();

var config = require('../config.js');
var index = require('./index.js');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('create', { title: config.name_of_project });
});

router.post('/', function (req, res) {
  index.items.push(req.body['name-of-project']);
  res.redirect('/');
});

module.exports = router;
