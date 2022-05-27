const express = require('express');
const router = express.Router();
const {postNewPass} =require('../controller/cambiapass')

router.get('/new_pass',(req, res) => {
       res.render('cambiapass/new_pass');
});

router.post('/new_pass', postNewPass);

module.exports = router;