
//dependencias
var cors = require('cors');
var express = require('express');
var morgan = require('morgan');

//imports 
var PORT = require('./config/properties').PORT;
var DB = require('./config/database');

//Database
DB();

//imports middlewares
var authentication = require('./middlewares/auth');

//imports rutas
var rutasInit = require('./routes/auth');
var rutasRegistred = require('./routes/app');



var app = express();
var router = express.Router();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get('/',(req,res) => {
	res.send('ola cha');
});

app.use('/',rutasInit);
app.use('/app' , authentication , rutasRegistred);
//app.use('/modern')
//app.use('/admin');
app.listen(PORT);