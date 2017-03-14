
/*
 * GET home page, which is specified in Jade.
 */

exports.do_work = function(req, res){
  res.render('index.jade', { 
	  title: 'Please enter a person login' 
  });
};
exports.do_ref = function(req, res){
  res.render('reference.jade', {});
};
exports.do_fam = function(req, res){
  res.render('your_work.jade', {});
};
exports.do_mem = function(req, res){
  res.render('members.jade', {});
};
