//import dependencias
var jwt = require('jsonwebtoken');

//import datos
var SECRETKEY = require('../config/properties').SECRET_KEY;

//import models
var Users = require('../models/usuarios');

module.exports = function(req,res,next){
	
	if (!req.headers.authorization) return res.status(401).send('no tienes autorisacion');
	
	let token = req.headers.authorization.split(' ')[1];
	
	if (token === 'null') return res.status(401).send('no tienes autorisacion');

	let verify = jwt.verify(token,SECRETKEY);
	
	console.log(verify);

	Users.findById(verify.id)
		 .then(doc => {
		 	console.log(doc);
		 	res.locals={
				idUser:doc._id
			};
			console.log(res.locals.idUser);
			next();
		 })
		 .catch(err => res.status(401).send('unautorized'));
	
	
	
	
}