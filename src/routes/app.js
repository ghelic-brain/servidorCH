var express = require('express');
var router = express.Router();

router.get('/use',(req,res)=>{
	res.send('lologre');
});

module.exports = router;
