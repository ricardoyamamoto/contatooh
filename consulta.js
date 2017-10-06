// contatooh/consulta.js
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

//Object ID de algum contato existente
var _idProcurado = new ObjectID('5840bb2e542240bdcb6b2b93');

MongoClient.connect('mongodb://127.0.0.1:27017/contatooh', 
	function(erro, db) {
		if(erro) throw err;
		db.collection('contatos').findOne({_id : _idProcurado},
			function(erro, contato){
				if(erro) throw err;
				console.log(contato);
			}
		);
	}
);