// Connect string to MySQL
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'fling.seas.upenn.edu',
  user     : 'boyette',
  password : 'your_password',
  database : 'boyette'
});

/////
// Query the oracle database, and call output_actors on the results
//
// res = HTTP result object sent back to the client
// name = Name to query for
function query_db(res, login) {
	query = "SELECT DISTINCT F.login FROM Family F";
	if (login) query = query + " WHERE login='" + login + "'";
	connection.query(query, function(err, rows, fields) {
		if (err) console.log(err);
		else {
			output_family(res, login, rows);
		}
	});
}

// ///
// Given a set of query results, output a table
//
// res = HTTP result object sent back to the client
// name = Name to query for
// results = List object of query results
function output_family(res,login,results) {
	res.render('your_work.jade',
		   { title: "Person with login " + login,
		     results: results }
	  );
}

/////
// This is what's called by the main app 
exports.do_fam = function(req, res){
	query_db(res,req.query.name);
};

