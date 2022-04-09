const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');

router.get('/', isLoggedIn, (req, res) => {
   res.send('Hola desde Travelred');
});

router.get('/ahorro', isLoggedIn, (req, res) => {
   res.render('ahorro/add_ahorro');
});

router.get('/cuentas', isLoggedIn, (req, res) => {
   res.render('cuentas/add_cuenta');
});

router.get('/grupos', isLoggedIn, (req, res) => {
   res.render('grupos/add_grupo');
});

router.get('/tours', isLoggedIn, (req, res) => {
   res.render('tours/add_tour');
});

router.get('/reservas', isLoggedIn, (req, res) => {
   res.render('reservas/add_reserva');
});

router.get('/cajamayor', isLoggedIn, (req, res) => {
   res.render('cajamayor/add_cajamayor');
});

router.get('/cajamenor', isLoggedIn, (req, res) => {
   res.render('cajamenor/add_cajamenor');
});

router.get('/devoluciones', isLoggedIn, (req, res) => {
   res.render('devoluciones/add_devolucion');
});

module.exports = router;