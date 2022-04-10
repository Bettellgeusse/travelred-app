const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { validateCajamayor } = require('../validators/cajamayor');
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add_cajamayor',(req, res) => {
       res.render('cajamayor/add_cajamayor');
});

router.post('/add_cajamayor', validateCajamayor, async (req, res) => {
    // const {cja_fecha, cja_Beneficiario, cja_concepto, cja_tipo,cja_valor,cja_estado } = req.body;
    // const nuevaCajamayor ={
    //     cja_fecha, 
    //     cja_Beneficiario,
    //     cja_concepto, 
    //     cja_tipo,
    //     cja_valor,
    //     cja_estado
    // };
    const nuevaCajamayor = req.body;
    await pool.query('INSERT INTO cajamayor set ?', [nuevaCajamayor]);
    res.json({"message":"Registro Agregado  correctamente"})
    //req.flash('success','Agregada Correctamente');
    //res.redirect('/cajamayor/listar_cajamayor');
});

    router.get('/listar_cajamayor',  async (req, res) => {
        const verCajamayor = await pool.query('SELECT * FROM cajamayor');
        //res.render('cajamayor/listar_cajamayor', {verCajamayor:verCajamayor});
        return res.json(verCajamayor);
    });

    router.get('/eliminar_cajamayor/:id', async (req, res) => {
        const {id} = req.params;
         await pool.query('DELETE FROM cajamayor WHERE CJA_ID  = ?',[id]);
        //req.flash('success','Eliminada Correctamente');
        //res.redirect('/cajamayor/listar_cajamayor');
        res.json({"message":"Registro Eliminado  correctamente"})
    });

    // router.get('/editar_cajamayor/:id',  async (req, res) => {
    //     const {id} = req.params;
    //     const editarCajamayor = await pool.query('SELECT * FROM cajamayor WHERE CJA_ID = ?',[id]);
    //     res.render('cajamayor/editar_cajamayor',{editarCajamayor:editarCajamayor[0]} );
        
    // });

    router.post('/editar_cajamayor/:id',  async (req, res) => {
        const {id} = req.params;
        // const {cja_fecha, cja_Beneficiario, cja_concepto, cja_tipo,cja_valor,cja_estado } = req.body;
        // const nuevaCajamayor ={
        //     cja_fecha, 
        //     cja_Beneficiario,
        //     cja_concepto, 
        //     cja_tipo,
        //     cja_valor,
        //     cja_estado
        // };
        const nuevaCajamayor = req.body;
        await pool.query('UPDATE cajamayor set ? WHERE CJA_ID = ?', [nuevaCajamayor,id]);
        res.json({"message":"Registro Agregado  correctamente"})
        //req.flash('success','Actualizada Correctamente');
        //res.redirect('/cajamayor/listar_cajamayor');
    });


module.exports = router;