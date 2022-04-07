const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add_devolucion',(req, res) => {
       res.render('devoluciones/add_devolucion');
});

router.post('/add_devolucion', async (req, res) => {
    const {aho_acom, aho_extra, aho_abono1, aho_abono2, aho_abono3, aho_fecha_abono1, aho_fecha_abono2, aho_fecha_abono3,aho_cancelado } = req.body;
    const nuevaDevolucion ={
        aho_acom, 
        aho_extra, 
        aho_abono1, 
        aho_abono2, 
        aho_abono3, 
        aho_fecha_abono1, 
        aho_fecha_abono2, 
        aho_fecha_abono3,
        aho_cancelado 
    };
    //const nuevoUsuario = req.body;
    console.log(nuevaDevolucion);
    await pool.query('INSERT INTO devolucion set ?', [nuevaDevolucion]);
    //res.json({"message":"Registro Agregado  correctamente"})
    req.flash('success','Devolucion Agregado Correctamente');
    res.redirect('/devoluciones/listar_devolucion');
});

    router.get('/listar_devolucion',  async (req, res) => {
        const veradevolucion = await pool.query('SELECT * FROM devolucion');
        res.render('devoluciones/listar_devolucion', {veradevolucion:veradevolucion});
        //return res.json(vercliente); 
    });

    router.get('/eliminar_devolucion/:id', async (req, res) => {
        const {id} = req.params;
         await pool.query('DELETE FROM devolucion WHERE DEV_ID = ?',[id]);
        req.flash('success','Devolucion Eliminado Correctamente');
        res.redirect('/devoluciones/listar_devolucion');
        //res.json({"message":"Registro Eliminado  correctamente"})
    });

    router.get('/editar_devolucion/:id',  async (req, res) => {
        const {id} = req.params;
        const editarDevolucion = await pool.query('SELECT * FROM devolucion WHERE DEV_ID = ?',[id]);
        res.render('devoluciones/editar_devolucion',{editarDevolucion:editarDevolucion[0]} );
        
    });

    router.post('/editar_devolucion/:id',  async (req, res) => {
        const {id} = req.params;
        const {aho_acom, aho_extra, aho_abono1, aho_abono2, aho_abono3, aho_fecha_abono1, aho_fecha_abono2, aho_fecha_abono3,aho_cancelado } = req.body;
        const nuevaDevolucion ={
            aho_acom, 
            aho_extra, 
            aho_abono1, 
            aho_abono2, 
            aho_abono3, 
            aho_fecha_abono1, 
            aho_fecha_abono2, 
            aho_fecha_abono3,
            aho_cancelado 
        };
        // const editarUsuario = req.body;
        await pool.query('UPDATE devolucion set ? WHERE DEV_ID = ?', [nuevaDevolucion,id]);
        //res.json({"message":"Registro Agregado  correctamente"})
        req.flash('success','Devolucion Actualizado Correctamente');
        res.redirect('/devoluciones/listar_devolucion');
    });


module.exports = router;