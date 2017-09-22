var Programmers;
exports.setModel = function	(modelo) {
Programmers = modelo;

};

exports.index  = function (req, res){
Programmers.find ({}, function (error, programmers){
if (error){
res.send ('Ha surgido un error!');
} else {
console.log(req.session.programmers_id);
res.render ('programmers/index',{
programmers: programmers

});

}

})

};

//insertar datos en la base de datos

exports.create = function (req,res){
res.render ('programmers/save', {
action: '/app/programmers',
programmers: new Programmers ({
 nombre: '',
 apellido: '',
 informacion: '',
 user:'',
 pass:''
})

});

};


//guardar datos en la base de datos con el formulario

exports.store = function (req,res) {
var programmers = new Programmers ({
nombre: req.body.nombre,
apellido: req.body.apellido,
informacion: req.body.informacion,
user: req.body.user,
pass: req.body.pass
});

programmers.save (function (error, documento) {
if (error) {
   res.send ('Error al intentar guardar');
}else {
	res.redirect ('/app/programmers');
}

});

};

//mostrar informacion y datos del usuario seleccionado "VER"

exports.show = function (req,res) {
Programmers.findById(req.params.id, function (error, documento) {

if (error) {
res.send ('Error al intentar ver el programmer');


}else{
res.render ('programmers/show', {
programmers: documento
});



}


});

};



//editar usuarios ya previamiente guardados


exports.edit = function (req,res){
  Programmers.findById (req.params.id, function (error, documento){
   if (error){
  res.send ('Error al intentar ver el programmers');
}else{
res.render ('programmers/save', {
action: '/app/programmers/update/' + req.params.id,
programmers: documento

});
}
});
};

exports.update = function (req, res) {
Programmers.findById (req.params.id, function (error, documento) {
if (error){
res.send ("error al intentar modificar programmers");
}else{
var programmers = documento;
programmers.nombre = req.body.nombre;
programmers.apellido = req.body.apellido;
programmers.informacion = req.body.informacion;
programmers.user = req.body.user;
programmers.pass = req.body.pass;
programmers.save (function(error, documento){

if (error) {

res.send ('Error al intentar guardar el programmers');

}else{
res.redirect ('/app/programmers');
}
});
}
});
};

//eliminar usuarios

exports.destroy = function(req, res){
Programmers.remove({_id: req.params.id}, function(error, documento){
if (error) {
res.send ('Error al intentar eliminar el programmers');

}else{
res.redirect ('/app/programmers');

}

});

}

//variable de sesion

exports.session	= function (req,res) {
	Programmers.find({user:req.body.user,pass:req.body.pass}, function(error, programmers){
		if(error) {
			res.send('Ha surgido un error');
		 }else{
		 	if(programmers.length > 0) {
		 		req.session.programmers_id = programmers[0]._id;
		 		req.session.programmers_user = programmers[0].user;
		 		res.redirect('/');
		 	}else{
		 		res.redirect('/');
		 	}
		}
	});

}


//cerra sesion

exports.close = function (req,res) {
	req.session.programmers_id = "";
	req.session.programmers_user = null;
	res.redirect ('/app');
}