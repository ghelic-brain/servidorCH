var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var typeUsers = ['Admin','Moderator','Poster','Suspended','Block'];
var Fact = ['Florente','Yggdra','Servantes'];

var Usuario_Schema = new Schema({
	name:{
		type:String,
		minlength:[8,"tu nombre es muy pequeno"],
		maxlength:[50,"tu nombre es demaciado largo"],
		required:"nombre necesario"
	},
	nickName:{
		type:String,
		minlength:[5,"tu nickname es muy pequeño"],
		maxlength:[30,"tu nickname es muy largo"]
	},
	email:{
		type:String,
		required:'tu email es nesesario',
		unique:true,
		minlength:[9,"tu email es muy pequeño"],
		maxlength:[40,"tu email es muy largo"],
		match:[/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,'tu email no parece un email']
	},
	age:{
		type: Number,
		required:"tu edad es requerida",
		min:[18,"eres muy pequeno."],
		max:[118,"eres muy grande."]
	},
	password:{
		type:String,
		required:"tu contrasena es requerida"
	},
	roles:{
		type:String,
		enum:typeUsers,
		required:'rol requerido'
	},
	team:{
		type:String,
		enum:Fact
	}
},{
	timestamps:true
});

var Usuario = mongoose.model('User',Usuario_Schema);

module.exports = Usuario;