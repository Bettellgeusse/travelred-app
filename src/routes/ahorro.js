const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validateahorro } = require('../validators/ahorro');
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add_ahorro',(req, res) => {
       res.render('ahorro/add_ahorro');
});

router.post('/add_ahorro', validateahorro, async (req, res) => {
    const {aho_acom, aho_extra, aho_abono1, aho_abono2, aho_abono3, aho_fecha_abono1, aho_fecha_abono2, aho_fecha_abono3 } = req.body;
    const nuevoAhorro ={
        aho_acom, 
        aho_extra, 
        aho_abono1, 
        aho_abono2, 
        aho_abono3, 
        aho_fecha_abono1, 
        aho_fecha_abono2, 
        aho_fecha_abono3 
    };
    //const nuevoUsuario = req.body;
    console.log(nuevoAhorro);
    await pool.query('INSERT INTO ahorro set ?', [nuevoAhorro]);
    //res.json({"message":"Registro Agregado  correctamente"})
    req.flash('success','Ahorro Agregado Correctamente');
    res.redirect('/ahorro/lista_ahorros');
});

    router.get('/lista_ahorros',  async (req, res) => {
        const verahorro = await pool.query('SELECT * FROM ahorro');
        //res.render('ahorro/lista_ahorros', {verahorro:verahorro});
        return res.json(verahorro);
    });

    router.get('/eliminar_ahorro/:id', async (req, res) => {
        const {id} = req.params;
         await pool.query('DELETE FROM ahorro WHERE DEV_ID2 = ?',[id]);
        req.flash('success','Ahorro Eliminado Correctamente');
        res.redirect('/ahorro/lista_ahorros');
        //res.json({"message":"Registro Eliminado  correctamente"})
    });

    router.get('/editar_ahorro/:id',  async (req, res) => {
        const {id} = req.params;
        const editarAhorro = await pool.query('SELECT * FROM ahorro WHERE DEV_ID2 = ?',[id]);
        res.render('ahorro/editar_ahorro',{editarAhorro:editarAhorro[0]} );
        
    });

    router.post('/editar_ahorro/:id',  async (req, res) => {
        const {id} = req.params;
        const {aho_acom, aho_extra, aho_abono1, aho_abono2, aho_abono3, aho_fecha_abono1, aho_fecha_abono2, aho_fecha_abono3 } = req.body;
        const editarAhorro ={
            aho_acom, 
            aho_extra, 
            aho_abono1, 
            aho_abono2, 
            aho_abono3, 
            aho_fecha_abono1, 
            aho_fecha_abono2, 
            aho_fecha_abono3 
        };
        // const editarUsuario = req.body;
        await pool.query('UPDATE ahorro set ? WHERE DEV_ID2 = ?', [editarAhorro,id]);
        //res.json({"message":"Registro Agregado  correctamente"})
        req.flash('success','Ahorro Actualizado Correctamente');
        res.redirect('/ahorro/lista_ahorros');
    });


module.exports = router;