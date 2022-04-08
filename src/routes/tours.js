const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { validateTours } = require('../validators/tours');
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add_tour',(req, res) => {
       res.render('tours/add_tour');
});

router.post('/add_tour', validateTours, async (req, res) => {
    const {tou_nombre, tou_tipo, tou_valorneto, tou_valorcomisionable,tou_observaciones,tou_fecha } = req.body;
    const nuevoTour ={
        tou_nombre, 
        tou_tipo, 
        tou_valorneto, 
        tou_valorcomisionable,
        tou_observaciones,
        tou_fecha
    };
    //const nuevoUsuario = req.body;
    console.log(nuevoTour);
    await pool.query('INSERT INTO tour set ?', [nuevoTour]);
    //res.json({"message":"Registro Agregado  correctamente"})
    req.flash('success','Tour Agregado Correctamente');
    res.redirect('/tours/listar_tours');
});

    router.get('/listar_tours',  async (req, res) => {
        const vertours = await pool.query('SELECT * FROM tour');
        //res.render('tours/listar_tours', {vertours:vertours});
        return res.json(vertours);
    });

    router.get('/eliminar_tour/:id', async (req, res) => {
        const {id} = req.params;
         await pool.query('DELETE FROM tour WHERE TOU_ID  = ?',[id]);
        req.flash('success','Tour Eliminado Correctamente');
        res.redirect('/tours/listar_tours');
        //res.json({"message":"Registro Eliminado  correctamente"})
    });

    router.get('/editar_tour/:id',  async (req, res) => {
        const {id} = req.params;
        const editarTour = await pool.query('SELECT * FROM tour WHERE TOU_ID = ?',[id]);
        res.render('tours/editar_tour',{editarTour:editarTour[0]} );
        
    });

    router.post('/editar_tour/:id',  async (req, res) => {
        const {id} = req.params;
        const {tou_nombre, tou_tipo, tou_valorneto, tou_valorcomisionable,tou_observaciones,tou_fecha } = req.body;
        const nuevoTour ={
            tou_nombre, 
            tou_tipo, 
            tou_valorneto, 
            tou_valorcomisionable,
            tou_observaciones,
            tou_fecha
        };
        // const editarUsuario = req.body;
        await pool.query('UPDATE tour set ? WHERE TOU_ID = ?', [nuevoTour,id]);
        //res.json({"message":"Registro Agregado  correctamente"})
        req.flash('success','Tour Actualizado Correctamente');
        res.redirect('/tours/listar_tours');
    });


module.exports = router;