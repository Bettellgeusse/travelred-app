const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validateahorro } = require('../validators/ahorro');
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

const {postAhorro, getAhorro, deleteAhrro, getEditAhorro, putahorro} = require('../controller/ahorros')

router.get('/add_ahorro',(req, res) => {
       res.render('ahorro/add_ahorro');
});

router.post('/add_ahorro', validateahorro, postAhorro );

router.get('/lista_ahorros',  getAhorro);

router.get('/eliminar_ahorro/:id', deleteAhrro);

router.get('/editar_ahorro/:id', getEditAhorro);

router.post('/editar_ahorro/:id',  putahorro);


module.exports = router;