var express = require('express');
var router = express.Router();

//imports controllers
var Controller = require('../controllers/init');

router.post('/login',Controller.login);
router.post('/register',Controller.register);


module.exports = router;