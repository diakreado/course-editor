var express = require('express');
var router = express.Router();

var config = require('../config.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('create', { title: config.name_of_project });
});

router.post('/', function(req, res) {
    console.log(req.body);
});

module.exports = router;
