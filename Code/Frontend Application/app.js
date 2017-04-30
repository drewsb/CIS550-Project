var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var AWS = require('aws-sdk');
var mysql = require('mysql');
var MongoClient = require('mongodb').MongoClient;
var timeout = require('connect-timeout');
var madison = require('madison');
var tableify = require('tableify');

 

var index = require('./routes/index');
var login = require('./routes/login');
var admin = require('./routes/admin');
var router = express.Router();

var connection = mysql.createConnection({
  host     : 'cis550sql.cl12qlaqfgyt.us-west-2.rds.amazonaws.com',
  user     : 'cis550krewsql',
  password : 'cis450550team',
  database : 'cis550sqlproject',
  port : '3306'
});

connection.connect(function(err) {
  if (err) {
    console.log(err);
  }
});

/*
connection.query("Select count(*) as cnt from Universities", function(error, results, fields) {
  if (error) {
    console.log(error)
  } else {
    console.log("Ret was: " + results[0].cnt);
  }
});

*/

// !!!NOTE: Following setup code largely based on node.js + express api docs 
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));

//app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.locals.pretty = true;
// !!!END_NODE End setup code

/* GET index page. */
app.get('/index', function(req, res, next) {

  res.render('index',{
                            state : "N/A",
                            tbl1 : tableify({}),
                            tbl2 : tableify({}),
                            tbl3 : tableify({}),
                            tbl4 : tableify({}),
                            tbl5 : tableify({}),
                            tbl6 : tableify({}),
                            tbl7 : tableify({}),
                            tbl8 : tableify({}),
                            tbl9 : tableify({}),
                            tbl10 : tableify({}),
                            tbl11 : tableify({}),
                            tbl12 : tableify({}),
                            tbl13 : tableify({}),
                            tbl14 : tableify({})
                          });
});

/* POST index page. */
app.post('/index', function(req, res, next) {

  var state = req.body.state;
  console.log("got state " + state);

  // sports venues per city per state
  var sportvq = "Select c.name, c.pop, count(*) as numberOfSportsVenues From sport_venues s, cities_towns c Where s.city = c.name and s.state= '" + state + "' and c.state= '" + state + "' and c.pop > 0 Group by c.name, c.pop;"
  //console.log(sportvq);
  connection.query(sportvq, function(error, results1, fields) {
    if (error) {
      console.log(error)
    } else {
      //console.log("Sport Venue per city was \n " + JSON.stringify(results1)); 
    }


    var sportvencount = "Select state, count(*) as numberOfSportsVenues From sport_venues Where state= '" + state + "';";
    //console.log(sportvencount);
    connection.query(sportvencount, function(error, results2, fields) {
      if (error) {
        console.log(error)
      } else {
        //console.log("\nSport Venue per state was \n " + JSON.stringify(results2));
      }

      var hostpitalvenue = "Select c.state, c.name, c. pop, count(*) as numberOfHospitals From Hospitals s, cities_towns c Where s.city = c.name and c.state = '" + state + "' and s.state= '" + state + "' and c.pop > 0 Group by c.name Order by c.name;"
      //console.log(hostpitalvenue);
      connection.query(hostpitalvenue, function(error, results3, fields) {
      if (error) {
        console.log(error)
      } else {
        //console.log("\nHospital Venue per city was \n " + JSON.stringify(results3));
      }

      var hospitalperstate = "Select state, count(*) as numberOfHospitals From Hospitals h Where h.state = '" + state + "';"
      //console.log(hospitalperstate);
      connection.query(hospitalperstate, function(error, results4, fields) {
      if (error) {
        console.log(error)
      } else {
        //console.log("\nHospital Venue per state was \n " + JSON.stringify(results4));
      }

        var citiesperstate = "Select c.state ,count(*) as numberOfCities From cities_towns c Where c.state = '" + state + "';"
        //console.log(citiesperstate);
        connection.query(citiesperstate, function(error, results5, fields) {
        if (error) {
          console.log(error)
        } else {
          //console.log("\nCities per state was \n " + JSON.stringify(results5));
        }

          var populationperstate = "Select p.state, pop_2016 as pop2016 From Population p Where p.state = '" + state + "';"    
          //console.log(populationperstate);
          connection.query(populationperstate, function(error, results6, fields) {
          if (error) {
            console.log(error)
          } else {
            //console.log("\nPopulation per state was \n " + JSON.stringify(results6));
          }

            var populationdelta = "Select p.state, Sum(p.pop_2016) - Sum(p.pop_2013) as popChangeFrom2013To2016 From Population p Where p.state = '" + state + "';"    
            //console.log(populationdelta);
            connection.query(populationdelta, function(error, results7, fields) {
            if (error) {
              console.log(error)
            } else {
              //console.log("\nPopulation delta since 2013 -> 2016 was \n " + JSON.stringify(results7));
            }

              var hospitaluniversity = "Select u.state, u.name as University, count(*) as numberOfHospitalsOnCampus, u.zip From Universities u inner join Hospitals h on u.zip = h.zip Where u.state= '" + state + "' and h.state= '" + state + "' Group by u.name;"
              //console.log(hospitaluniversity);
              connection.query(hospitaluniversity, function(error, results8, fields) {
              if (error) {
                console.log(error)
              } else {
                //console.log("\nUniv with Hospitals in state -> 2016 was \n " + JSON.stringify(results7));
              }

              // takes a really long time
              var maxsportvenuecity = "Select DISTINCT U.city, U.name, VC.num as NumVenues FROM Universities U JOIN VenueCount VC ON U.city = VC.name WHERE U.state = '" + state + "' AND VC.num = ( Select max(V.num) From ( Select * From VenueCount Where state = '" + state + "') as V)"
              //console.log(maxsportvenuecity);
              connection.query(maxsportvenuecity, function(error, results9, fields) {
              if (error) {
                console.log(error)
              } else {
                //console.log("\nnum univ \n " + JSON.stringify(results8));
              }

                var obsesityperstate = "Select o.state, o.obesity_rate as obesityRatePercentage From Obesity o Where o.state = '" + state + "';"
                //console.log(obsesityperstate);
                connection.query(obsesityperstate, function(error, results10, fields) {
                if (error) {
                  console.log(error)
                } else {
                  //console.log("\nobesity per state was \n " + JSON.stringify(results9));
                }

                  var sameObesityState = "Select o.state, o.obesity_rate as obesityRatePercentage From Obesity o Where o.obesity_rate = (select obesity_rate from Obesity where state = '" + state + "');"
                  //console.log(sameObesityState);
                  connection.query(sameObesityState, function(error, results11, fields) {
                  if (error) {
                    console.log(error)
                  } else {
                    //console.log("\nstates with same obesity are \n " + JSON.stringify(results10));
                  }

                    var popunivspercity = "Select c.state, c.name, c. pop, count(*) as numberOfUniversities From Universities s, cities_towns c Where s.city = c.name and c.state = '" + state + "' and s.state = '" + state + "' and c.pop > 0 Group by c.name Order by c.name;"
                    //console.log(popunivspercity);
                    connection.query(popunivspercity, function(error, results12, fields) {
                    if (error) {
                      console.log(error)
                    } else {
                      //console.log("\npopulation Universities in all cities \n " + JSON.stringify(results11));
                    }

                      var numuniv = "Select c.state, count(*) as numberOfColleges From Universities c Where c.state = '" + state + "' Group by c.state;"
                      //console.log(numuniv);
                      connection.query(numuniv, function(error, results13, fields) {
                      if (error) {
                        console.log(error)
                      } else {
                        //console.log("\nnum universities in state \n " + JSON.stringify(results12));
                      }

                        var longcomplex = "Select cityAndHospital.name, cityAndHospital.pop, cityAndHospital.numHospitals, count(*) as numUniversities From (Select largeCities.name, largeCities.pop, count(*) as numHospitals From (Select c.name as name, c.pop as pop From cities_towns c, Hospitals h, Universities u Where c.state= '" + state + "' and h.state= '" + state + "' and u.state= '" + state + "' and c.name = h.city and h.city = u.city Group by c.name Order by c.pop desc Limit 5) largeCities, Hospitals h Where largeCities.name = h.city and h.state= '" + state + "' Group by largeCities.name Order by largeCities.pop desc) cityAndHospital, Universities u Where u.state= '" + state + "' and cityAndHospital.name = u.city Group by cityAndHospital.name Order by cityAndHospital.pop desc;"
                        //console.log(longcomplex);
                        connection.query(longcomplex, function(error, results14, fields) {
                        if (error) {
                          console.log(error)
                        } else {
                          //console.log("\ntop 5 towns \n " + JSON.stringify(results13));

                          //console.log(tableify(results1));
                          // final render
                          
                        }
                            console.log(JSON.stringify(results1));
                            console.log(JSON.stringify(results2));
                            //console.log(JSON.stringify(results3));
                            res.json({
                            state : state,
                            tbl1 : tableify(results1),
                            tbl2 : tableify(results2),
                            tbl3 : tableify(results3),
                            tbl4 : tableify(results4),
                            tbl5 : tableify(results5),
                            tbl6 : tableify(results6),
                            tbl7 : tableify(results7),
                            tbl8 : tableify(results8),
                            tbl9 : tableify(results9),
                            tbl10 : tableify(results10),
                            tbl11 : tableify(results11),
                            tbl12 : tableify(results12),
                            tbl13 : tableify(results13),
                            tbl14 : tableify(results14)
                          });

                        });

                      });

                    });

                  });

                });

              });

              });

            });

          });

        });

      });

    });



    });
  });
  
});

/* GET admin page. */
app.get('/admin', function(req, res, next) {
  res.render('admin');
});

/* POST admin page. */
app.post('/admin', function(req, res, next) {
  res.render('admin');
});

/* GET login page. */
app.get('/', function(req, res, next) {
  res.render('login');

});

// POST login page
app.post('/', function(req, res, next) {
  // based on mongolab/mongodb docs (github/mongolab node example proj)
  var mlaburl = 'mongodb://admin:admin@ds159180.mlab.com:59180/cis-550-users';
  var username = req.body.username;
  var password = req.body.password;
  var button = req.body.submit;
  console.log("username: " + username);
  console.log("password: " + password);
  console.log("button: " + button);
  if (button === "login") {
    // login
    MongoClient.connect(mlaburl, function(err, db) {
      if (err) {
        console.log(err);
        res.render('login');
      } else {
        console.log("Valid connection - login");
        // check db for valid conection
        var user_curs = db.collection('users').find({
          "username" : username,
          "password" : password
        }).count(function(err,count) {
          console.log(count);
          if (err) {
            // search failed
            console.log("failed");
            res.render('login');
          } else {
            if (count > 0) {
              res.render('index');
            } else {
              res.render('login_fail');
            }
          }
        });
      }
    });
  } else if (button === "github") {
    // do something
  } else {
    // register
    MongoClient.connect(mlaburl, function(err, db) {
      if (err) {
        console.log(err);
        res.render('login');
      } else {
        console.log("Valid connection - register");
        db.collection('users').insertOne({
          "username" : username,
          "password" : password
        }, function(err, result) {
          if (err) {
            // register failed
            console.log("Register failed");
            res.render('login');
          } else {
            console.log("Register success");
            res.render('register');
          }
        })
      }
    });
  }
});


// Autogenerated Express Error Handling Code

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
