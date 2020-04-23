//imports dependencies
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var SECRETKEY = require('../config/properties').SECRET_KEY;

//imports models
var modeloUsuario = require('../models/usuarios');

var controller_init = {
	login:(req,res)=>{
		let userData = {
			email:req.body.email,
			password:req.body.password
		};
		modeloUsuario.findOne({ email: userData.email })
					 .then(user => {
					 	let resultPassword = bcrypt.compareSync(userData.password, user.password);
					 	if (resultPassword) {
					 		let expiresIn = 24 * 60 * 60;
					 		let accessToken = jwt.sign({ id:user._id },SECRETKEY,{expiresIn:expiresIn});

					 		let dataUser = {
					 			data:{
					 				name:user.name,
					 				nickName:user.nickName,
					 				age:user.age,
					 				roles:user.roles,
					 				team:user.team
					 			},
					 			accessToken:accessToken,
					 			expiresIn:expiresIn
					 		};
					 		res.send({ dataUser });
					 	}else{
					 		res.status(409).send('algo esta mal');
					 	}
					 })
					 .catch(err =>{
					 	return res.status(409).send('algo esta mal');
					 });
	},

	register:(req,res)=>{
		if ( !req.body.password === req.body.passwordValidation ) {
			return res.status(403).send('la contraseña no es igual a la confirmacion');
		}
		let newUser = {
			name:req.body.name,
			nickName:req.body.nickName,
			email:req.body.email,
			age: req.body.age,
			password:bcrypt.hashSync(req.body.password),
			roles:req.body.roles,
			team:req.body.team
		};
		
		
		console.log(newUser);
		let usuario = new modeloUsuario(newUser);
		usuario.save()
			   .then(doc => {
			 		var expiresIn = 24 * 60 * 60;
				 	var accessToken = jwt.sign({
				 		id: doc._id
				 	},SECRETKEY,{
				 		expiresIn:expiresIn
				 	});
				 	let dataUser = {
					 			data:{
					 				name:user.name,
					 				nickName:user.nickName,
					 				age:user.age,
					 				roles:user.roles,
					 				team:user.team
					 			},
					 			accessToken:accessToken,
					 			expiresIn:expiresIn
					 		};
				 	res.status(200).send({ dataUser });
			   })
			   .catch(err => {
				 	console.log(err);
				 	console.log(err.errors);
				 	//error email ya usado (Nice)
				 	if (err && err.code === 11000) return res.status(409).send('Email already exists');

				 	//errores del nombre
				 	if (err && err.errors.name) return res.status(401).send(err.errors.name.message);

				 	//errores del email
				 	if (err && err.errors.email) return res.status(401).send(err.errors.email.message);

				 	//errores de la edad
				 	if (err && err.errors.age) return res.status(401).send(err.errors.age.message);

				 	//errores no reconocidos
				 	if (err) return res.status(500).send('server problems in ingress');
			   });
	}
};

module.exports = controller_init;