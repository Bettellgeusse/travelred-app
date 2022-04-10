const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { validateCajamenor } = require('../validators/cajamenor');
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add_cajamenor',(req, res) => {
       res.render('cajamenor/add_cajamenor');
});

router.post('/add_cajamenor', validateCajamenor, async (req, res) => {
    // const {cja_fecha, cja_Beneficiario, cja_concepto, cja_tipo,cja_valor,cja_estado } = req.body;
    // const nuevaCajamenor ={
    //     cja_fecha, 
    //     cja_Beneficiario,
    //     cja_concepto, 
    //     cja_tipo,
    //     cja_valor,
    //     cja_estado
    // };
    const nuevaCajamenor = req.body;
    console.log(nuevaCajamenor);
    await pool.query('INSERT INTO cajamenor set ?', [nuevaCajamenor]);
    res.json({"message":"Registro Agregado  correctamente"})
    //req.flash('success','Agregada Correctamente');
    //res.redirect('/cajamenor/listar_cajamenor');
});

    router.get('/listar_cajamenor',  async (req, res) => {
        const verCajamenor = await pool.query('SELECT * FROM cajamenor');
        //res.render('cajamenor/listar_cajamenor', {verCajamenor:verCajamenor});
        return res.json(verCajamenor);
    });

    router.get('/eliminar_cajamenor/:id', async (req, res) => {
        const {id} = req.params;
         await pool.query('DELETE FROM cajamenor WHERE CJA_ID  = ?',[id]);
        //req.flash('success','Eliminada Correctamente');
        //res.redirect('/cajamenor/listar_cajamenor');
        res.json({"message":"Registro Eliminado  correctamente"})
    });

    router.get('/editar_cajamenor/:id',  async (req, res) => {
        const {id} = req.params;
        const editarCajamenor = await pool.query('SELECT * FROM cajamenor WHERE CJA_ID = ?',[id]);
        res.render('cajamenor/editar_cajamenor',{editarCajamenor:editarCajamenor[0]} );
        
    });

    router.post('/editar_cajamenor/:id',  async (req, res) => {
        const {id} = req.params;
        // const {cja_fecha, cja_Beneficiario, cja_concepto, cja_tipo,cja_valor,cja_estado } = req.body;
        // const nuevaCajamenor ={
        //     cja_fecha, 
        //     cja_Beneficiario,
        //     cja_concepto, 
        //     cja_tipo,
        //     cja_valor,
        //     cja_estado
        // };
        const nuevaCajamenor = req.body;
        await pool.query('UPDATE cajamenor set ? WHERE CJA_ID = ?', [nuevaCajamenor,id]);
        res.json({"message":"Registro Agregado  correctamente"})
        //req.flash('success','Actualizada Correctamente');
        //res.redirect('/cajamenor/listar_cajamenor');
    });


module.exports = router;