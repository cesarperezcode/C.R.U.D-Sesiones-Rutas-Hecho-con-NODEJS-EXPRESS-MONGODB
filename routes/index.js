exports.index = function (req,res){
	if (!req.session.programmers_id){
		res.render('index', {session: "close"});
	}else{
		res.redirect('/app/programmers');	

	}

}