const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { validatereservas } = require('../validators/reservas');
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const {postReservas, getReservas, getIdReservas, deleteReservas, getEditReservas,putReservas, getIdReservasGrupo} =require('../controller/reservas')

router.get('/add_reserva',(req, res) => {
       res.render('reservas/add_reserva');
});

router.post('/add_reserva', postReservas);

router.get('/listar_reservas', getReservas );

router.get('/listar_reservas/:id', getIdReservas );

router.get('/listar_reservasGrupo/:id', getIdReservasGrupo );

router.get('/eliminar_reserva/:id', deleteReservas);

router.get('/editar_reserva/:id',  getEditReservas);

router.post('/editar_reserva/:id',  putReservas);


module.exports = router;