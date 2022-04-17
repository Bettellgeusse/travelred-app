const express = require('express');
const { body, validationResult } = require('express-validator');
const { validateCliente } = require('../validators/clientes.js')
const router = express.Router();


const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const { json } = require('express/lib/response');
const {postCliente, getCliente, getIdCliente, getCedulaCLiente, deleteCliente, getEditCliente, putCliente} = require('../controller/clientes');

router.get('/add', (req, res) => {
       res.render('clientes/add');
});

//Agregar cliente 
router.post('/add',  postCliente);

//Listar clientes 
router.get('/lista_clientes',  getCliente);
    
router.get('/lista_clientes/:id',  getIdCliente);

router.get('/lista_clientes_cedula/:cedula',  getCedulaCLiente);

router.get('/eliminar_cliente/:id', deleteCliente);

router.get('/editar_cliente/:id',  getEditCliente);

router.post('/editar_cliente/:id', putCliente);


module.exports = router;