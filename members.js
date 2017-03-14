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
	query = "SELECT DISTINCT P.login, P.name, P.sex, P.relationshipStatus, P.birthyear FROM Person P INNER JOIN Family F ON P.login = F.member";
	if (login) query = query + " AND F.login='" + login + "'";
	connection.query(query, function(err, rows, fields) {
		if (err) console.log(err);
		else {	
			output_members(res, login, rows);
		}
	});
}


// ///
// Given a set of query results, output a table
//
// res = HTTP result object sent back to the client
// name = Name to query for
// results = List object of query results
function output_members(res,login,results) {
	res.render('members.jade',
		   { title: "Family of login " + login,
		     results: results }
	  );
}

/////
// This is what's called by the main app 
exports.do_mem = function(req, res){
	query_db(res,req.query.name);
};


