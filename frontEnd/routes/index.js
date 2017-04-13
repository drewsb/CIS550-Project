var express = require('express');
var router = express.Router();

// Connect string to MySQL (FROM HW2)
// Based also off AWS rds docs

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'cis550project.cl12qlaqfgyt.us-west-2.rds.amazonaws.com',
  user     : 'cis550krew',
  password : 'cis450550team',
  database : 'DB550',
  port : '1521'
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});


/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index');
});

/* GET home page. */
router.post('/index', function(req, res, next) {
  res.render('index');
});


module.exports = router;
