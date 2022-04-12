const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { validateTours } = require('../validators/tours');
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const {postTours, getTours, getIdTours,deleteours,getEditTours,putTours} = require('../controller/tours')

router.get('/add_tour',(req, res) => {
       res.render('tours/add_tour');
});

router.post('/add_tour', validateTours, postTours);

router.get('/listar_tours',  getTours);

router.get('/listar_tours/:id',  getIdTours);

router.get('/eliminar_tour/:id', deleteours);

router.get('/editar_tour/:id',  getEditTours);

router.post('/editar_tour/:id',  putTours);


module.exports = router;