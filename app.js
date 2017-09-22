var express = require ("express");
var routes = require ("./routes/index");
var bodyParser = require ("body-parser");
var middleware = require('./routes/middleware');
var mongoose = require ("mongoose");
var programmers = require ("./routes/programmers");
var path = require('path');
var session = require ('express-session');

// var path = require ("path");
// app.engine('html', require('ejs').renderFile);
// app.set('views', path.join(__dirname, 'views'));



mongoose.connect('mongodb://127.0.0.1:27017/db', function (error){
if (error) {

throw error;

}else{
console.log('listo la conexion a la base de datos');
}

});


var programmersSchema = mongoose.Schema ({
nombre: {type: String, required:true},
apellido: {type: String, required:true},
informacion: {type:String, required:true},
user: {type:String, required:true},
pass: {type:String, required:true}
});


var programmersModel = mongoose.model('Programmers', programmersSchema);
programmers.setModel (programmersModel);


var app = express();

app.use(express.static('public'));
var engines = require('consolidate');
app.engine('jade', require('jade').__express);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'jade');
app.use (bodyParser.json());
app.use (bodyParser.urlencoded ({extended:true}));

app.use(session({

	secret: "sesiones",
	resave: false,
	saveUninitialized: false
}));


app.get ('/', routes.index);
app.post ('/session', programmers.session);

//m1verifica cuando no hemos iniciado sesion

app.use('/*', middleware.middleware1);

//m2ayuda a pasar a las siguientes funciones, rutas

app.use ('/app', middleware.middleware2);

//m3 verifica las url que ingresemos  una vez que iniciemos sesion y si no es ninguna nos redirecciona a index

app.get ('/*', middleware.middleware3);

app.get ('/app/programmers', programmers.index);
app.get ('/app/programmers/create', programmers.create);
app.post ('/app/programmers', programmers.store);
app.get ('/app/programmers/:id', programmers.show);
app.get ('/app/programmers/:id/edit', programmers.edit);
app.post ('/app/programmers/update/:id',programmers.update);
app.post('/app/programmers/delete/:id', programmers.destroy);
app.get ('/app/close', programmers.close);

app.listen (8080);

console.log ("start server in the 8080");

