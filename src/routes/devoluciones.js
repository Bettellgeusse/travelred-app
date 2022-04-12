const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { validatedevoluciones } = require('../validators/devoluciones');
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const {postDevoluciones, getDevoluciones, getIdDevoluciones, delteteDevoluciones, getEditDevoluciones,putDevoluciones} = require('../controller/devoluciones');

router.get('/add_devolucion',(req, res) => {
       res.render('devoluciones/add_devolucion');
});

router.post('/add_devolucion',validatedevoluciones, postDevoluciones);

router.get('/listar_devolucion',  getDevoluciones);

router.get('/listar_devolucion/:id',  getIdDevoluciones);

router.get('/eliminar_devolucion/:id',delteteDevoluciones);

router.get('/editar_devolucion/:id', getEditDevoluciones );

router.post('/editar_devolucion/:id', putDevoluciones);


module.exports = router;