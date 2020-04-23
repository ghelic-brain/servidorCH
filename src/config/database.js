const mongoose = require('mongoose');
const Url = require('./properties').DB;

module.exports = () => {
	mongoose.connect(Url,{
		useCreateIndex:true,
		useNewUrlParser:true,
		useFindAndModify:false,
		useUnifiedTopology:true
	})
	.then(()=> console.log(`Mongo conectado en ${Url}`))
	.catch(err => console.log(`Conexion la base de datos fallo.. ${err}`));
	
	process.on('SIGINT',() => {
		mongoose.connection.close(() => {
			console.log('mongo se a desconectado...');
			process.exit(0);
		});
	})	
}