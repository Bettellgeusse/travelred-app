const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { validategrupos } = require('../validators/grupos');
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const {poolGrupos,getGrupos,getIdGrupos,deleteGrupos,getEditGrupos,putGrupos} =require('../controller/grupos')

router.get('/add_grupo',(req, res) => {
       res.render('grupos/add_grupo');
});

router.post('/add_grupo', validategrupos, poolGrupos);

router.get('/listar_grupos',  getGrupos);

router.get('/listar_grupos/:id',  getIdGrupos);

router.get('/eliminar_grupo/:id', deleteGrupos);

router.get('/editar_grupo/:id', getEditGrupos );

router.post('/editar_grupo/:id',  putGrupos);


module.exports = router;