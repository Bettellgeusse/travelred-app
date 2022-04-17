const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { validateCajamenor } = require('../validators/cajamenor');
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const {postCajaMenor, getCajaMenor, getIdCajaMenor, deleteCajaMenor, editarCajaMenor, putCajaMenor} = require('../controller/cajamenor');

router.get('/add_cajamenor',(req, res) => {
       res.render('cajamenor/add_cajamenor');
});

router.post('/add_cajamenor',  postCajaMenor );

router.get('/listar_cajamenor',  getCajaMenor);

router.get('/listar_cajamenor/:id', getIdCajaMenor );

router.get('/eliminar_cajamenor/:id', deleteCajaMenor);

router.get('/editar_cajamenor/:id',  editarCajaMenor);

router.post('/editar_cajamenor/:id', putCajaMenor);


module.exports = router;