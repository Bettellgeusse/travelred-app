const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');

router.get('/', isLoggedIn, (req, res) => {
   res.send('Hola desde Travelred');
});

router.get('/ahorro',  (req, res) => {
   res.render('ahorro/add_ahorro');
});

router.get('/cuentas',  (req, res) => {
   res.render('cuentas/add_cuenta');
});

router.get('/grupos', (req, res) => {
   res.render('grupos/add_grupo');
});

router.get('/tours',  (req, res) => {
   res.render('tours/add_tour');
});

router.get('/reservas',  (req, res) => {
   res.render('reservas/add_reserva');
});

router.get('/cajamayor',  (req, res) => {
   res.render('cajamayor/add_cajamayor');
});

router.get('/cajamenor', (req, res) => {
   res.render('cajamenor/add_cajamenor');
});

router.get('/devoluciones', (req, res) => {
   res.render('devoluciones/add_devolucion');
});

module.exports = router;