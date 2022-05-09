const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validateahorro } = require('../validators/ahorro');
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const authController = require('../controller/auth')

const {postAhorro, getAhorro, deleteAhorro, getEditAhorro, putahorro, getIdAhorro} = require('../controller/ahorros')

router.get('/add_ahorro',(req, res) => {
       res.render('ahorro/add_ahorro');
});

router.post('/add_ahorro',  postAhorro );

router.get('/lista_ahorros',  getAhorro);

router.get('/lista_ahorros/:id',  getIdAhorro);

router.get('/eliminar_ahorro/:id', deleteAhorro);

router.get('/editar_ahorro/:id', getEditAhorro);

router.post('/editar_ahorro/:id',  putahorro);


module.exports = router;