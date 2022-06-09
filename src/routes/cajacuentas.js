const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const {postCajaCuentas, getCajaCuentas, getIdCajaCuentas, deleteCajaCuentas, editarCajaCuentas, putCajaCuentas} = require('../controller/cajacuentas');

router.get('/add_cajacuentas',(req, res) => {
       res.render('cajacuentas/add_cajacuentas');
});

router.post('/add_cajacuentas',  postCajaCuentas );

router.get('/listar_cajacuentas',  getCajaCuentas);

router.get('/listar_cajacuentas/:id', getIdCajaCuentas );

router.get('/eliminar_cajacuentas/:id', deleteCajaCuentas);

router.get('/editar_cajacuentas/:id',  editarCajaCuentas);

router.post('/editar_cajacuentas/:id', putCajaCuentas);


module.exports = router;