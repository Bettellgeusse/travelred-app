const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
var cors = require('cors')

const authController = require('../controller/auth')

router.use(cors())

router.get('/',  authController.isAuthenticated, (req, res) => {
   res.send('Hola desde Travelred');
});


// router.get('/', (req,res) =>{
//    res.render('index')
// })

router.get('/login',(req,res) =>{
   res.render('login')
})

router.get('/register',(req,res) =>{
   res.render('register')
})

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

router.get('/cajacuentas', (req, res) => {
   res.render('cajacuentas/add_cajacuentas');
});

router.get('/devoluciones', (req, res) => {
   res.render('devoluciones/add_devolucion');
});

router.get('/rol', (req, res) => {
   res.render('rol/add_rol');
});

router.get('/cambiapass', (req, res) => {
   res.render('cambiapass/new_pass');
});

//rutas del controlador
router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/logout', authController.logout)
// router.get('/getIdTours/:id', authController.userRolId)

module.exports = router;