//config/express.js
var express = require('express');
// declaração do arquivo das rotas
//var home = require('../app/routes/home');
//declareção do express-load - substitui o require('../app/routes/home') 
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var helmet = require('helmet');

module.exports = function(){
	var app = express();
	//variável de ambiente
	app.set('port',3000);
	
	//middleware
	app.use(express.static('./public'));


	//definindo template engine e views
	app.set('view engine', 'ejs');
	app.set('views','./app/views');

	//novos middlewares
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(require('method-override')());


	app.use(cookieParser());
	app.use(session(
		{ secret: 'homem avestruz',
		  resave: true,
		  saveUninitialized: true
		}
	));
	app.use(passport.initialize());
	app.use(passport.session());

	app.use(helmet.xframe());
	app.use(helmet.xssFilter());
	app.use(helmet.nosniff());
	app.disable('x-powered-by');

    //chamando a rota de home passando como parâmetro a instância do Express
    //home(app);
    //utilizando a função load que substitui a função home(app)
    load('models',{cwd: 'app'})
    	.then('controllers')
    	.then('routes')
    	.into(app);
    app.get('*', function(req, res){
    	res.status(404).render('404');
    });


	return app;
};