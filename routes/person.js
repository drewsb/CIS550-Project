// Connect string to MySQL
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'fling.seas.upenn.edu',
  user     : 'boyette',
  password : 'your_password',
  database : 'boyette'
});

/////
// Query the oracle database, and call output_person on the results
//
// res = HTTP result object sent back to the client
// name = Name to query for
function query_db(res, login) {
	query = "SELECT P.login, P.name, P.sex, P.relationshipStatus, P.birthyear, count(*) as num FROM Person P INNER JOIN Friends F ON P.login = F.login";
	if (login) query = query + " AND P.login='" + login + "'";
	query = query + " GROUP BY P.login;";
	connection.query(query, function(err, rows, fields) {
		if (err) console.log(err);
		else {
			output_persons(res, login, rows);
		}
	});
}

// ///
// Given a set of query results, output a table
//
// res = HTTP result object sent back to the client
// name = Name to query for
// results = List object of query results
function output_persons(res,login,results) {
	res.render('person.jade',
		   { title: "Person with login " + login,
		     results: results }
	  );
}

/////
// This is what's called by the main app 
exports.do_work = function(req, res){
	query_db(res,req.query.name);
};
