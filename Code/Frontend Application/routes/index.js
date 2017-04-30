var express = require('express');
var router = express.Router();

// Connect string to MySQL (FROM HW2)
// Based also off AWS rds docs

var mysql = require('mysql');

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index');
});

/* GET home page. */
router.post('/index', function(req, res, next) {
  res.render('index');
});


module.exports = router;
