const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { validateCajamayor } = require('../validators/cajamayor');
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const {posCajaMayor, getCajaMayor, getIdCajaMayor, deleteCajaMayor, getEditCajaMayor, putCajaMayor} = require('../controller/cajamayor');


router.get('/add_cajamayor',(req, res) => {
       res.render('cajamayor/add_cajamayor');
});

router.post('/add_cajamayor', validateCajamayor, posCajaMayor );

router.get('/listar_cajamayor', getCajaMayor );

router.get('/listar_cajamayor/:id', getIdCajaMayor );

router.get('/eliminar_cajamayor/:id', deleteCajaMayor);

router.get('/editar_cajamayor/:id',  getEditCajaMayor);

router.post('/editar_cajamayor/:id', putCajaMayor);


module.exports = router;