var url = require('url');

exports.middleware1 = function (req,res,next){
	if (!req.session.programmers_id) {
		res.redirect('http://localhost:8080/')
		res.end();
	}else{
		next();	
	}
}


exports.middleware2 = function(req,res,next) {
	if (!req.session.programmers_id) {
		res.redirect('/');
	}else{
		var pathname = url.parse(req.url).pathname;
		var cadenas = pathname.split ("/");
		if (cadenas[1]== "programmers" || cadenas[1]== "close") {
			res.locals = {session: req.session.programmers_id, user: req.session.programmers_user}
			next ();
		}else {
			res.redirect('/');
		}	
	}

}

exports.middleware3 = function(req,res,next){
var pathname = url.parse(req.url).pathname;
var cadenas = pathname.split("/");
if (cadenas[1]!="app") {
	res.redirect('/');
}else{
	next();	
}

}


//ARREGLOS 	if (cadenas[1]== "programmers" || cadenas[1]== "close") {
