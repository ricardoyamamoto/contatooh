var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');

module.exports = function(){

	var Usuario = mongoose.model('Usuario');
	passport.use(new GitHubStrategy({
		clientID: 'e86f6254c27fc54de6eb',
		clientSecret: '75f5fb489187b6e0a346cd70a474153bb5a3b452',
		callbackURL: 'http://localhost:3000/auth/github/callback'
	}, function(accessToken, refreshToken, profile, done){
		Usuario.findOrCreate(
			{	"login": profile.username},
			{	"nome": profile.username},
			function(erro, usuario) {
				if(erro){
					console.log(erro);
					return done(erro);
				}
				return done(null, usuario);
			}
		);
	}));
	passport.serializeUser(function(usuario, done){
		done(null, usuario._id);
	});
	passport.deserializeUser(function(id, done){
		Usuario.findById(id).exec()
		.then(function(usuario){
			done(null, usuario);
		});
	});
};