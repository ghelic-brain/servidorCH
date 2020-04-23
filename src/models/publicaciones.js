var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Publicacion_Schema = new Schema({
	title:{
		type:String,
		required:true,
		minlenght:[5,'titulo muy corto para el posteo...'],
		maxlenght:[50,'titulo muy largo para el posteo...']
	},
	content:{
		type:String,
		required:true,
		minlenght:[45,'debe tener mas de 50 letras tu posteo...'],
		maxlenght:[300,'debe tener menos de 300 letras tu posteo...']
	},
	author:{
		type:Schema.Types.ObjectId,
		ref:'User',
		required:true
	}
},{
	timestamps:true
});

var Publicacion = mongoose.model('New',Publicacion_Schema);

module.exports = Publicacion;