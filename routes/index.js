var express = require('express');
var router = express.Router();

var config = require('../config.js');

var array_of_items = [];

/* GET home page. */
router.get('/', function (req, res) {
  console.log(array_of_items);
  res.render('index', {
    title: config.name_of_project,
    items: array_of_items
  });
});


module.exports = router;
module.exports.items = array_of_items;

