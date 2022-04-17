const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { validateCuentas } = require('../validators/cuentas');
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const {postCuentas, getCuentas, getIdCuentas, deleteCuentas, getEditarCuentas, putCuentas} =require('../controller/cuentas');

router.get('/add_cuenta',(req, res) => {
       res.render('cuentas/add_cuenta');
});

router.post('/add_cuenta',  postCuentas);

router.get('/listar_cuentas', getCuentas );

router.get( '/listar_cuentas/:id', getIdCuentas)

router.get('/eliminar_cuenta/:id', deleteCuentas);

router.get('/editar_cuenta/:id',  getEditarCuentas);

router.post('/editar_cuenta/:id',  putCuentas);


module.exports = router;