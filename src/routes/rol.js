const express = require('express');
const { body, validationResult } = require('express-validator');
const { validateCliente } = require('../validators/clientes.js')
const router = express.Router();


const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const { json } = require('express/lib/response');
const {postRol, getRol, getIdRol, getCedulaRol, deleteRol, getEditRol, putRol} = require('../controller/rol');

router.get('/add', (req, res) => {
       res.render('rol/add');
});

//Agregar cliente 
router.post('/add',  postRol);

//Listar clientes 
router.get('/lista_rol',  getRol);
    
router.get('/lista_rol/:id',  getIdRol);

router.get('/lista_rol_cedula/:cedula',  getCedulaRol);

router.get('/eliminar_rol/:id', deleteRol);

router.get('/editar_rol/:id',  getEditRol);

router.post('/editar_rol/:id', putRol);


module.exports = router;