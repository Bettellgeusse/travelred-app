const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { validateCuentas } = require('../validators/cuentas');
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add_cuenta',(req, res) => {
       res.render('cuentas/add_cuenta');
});

router.post('/add_cuenta', validateCuentas, async (req, res) => {
    const {cta_banco, cta_numerocuenta, cta_nombre } = req.body;
    const nuevaCuenta ={
        cta_banco, 
        cta_numerocuenta, 
        cta_nombre
    };
    //const nuevoUsuario = req.body;
    console.log(nuevaCuenta);
    await pool.query('INSERT INTO cuentas set ?', [nuevaCuenta]);
    //res.json({"message":"Registro Agregado  correctamente"})
    req.flash('success','Cuenta Agregada Correctamente');
    res.redirect('/cuentas/listar_cuentas');
});

    router.get('/listar_cuentas',  async (req, res) => {
        const vercuenta = await pool.query('SELECT * FROM cuentas');
        //res.render('cuentas/listar_cuentas', {vercuenta:vercuenta});
        return res.json(vercuenta);
    });

    router.get('/eliminar_cuenta/:id', async (req, res) => {
        const {id} = req.params;
         await pool.query('DELETE FROM cuentas WHERE CTA_ID = ?',[id]);
        req.flash('success','Cuenta Eliminada Correctamente');
        res.redirect('/cuentas/listar_cuentas');
        //res.json({"message":"Registro Eliminado  correctamente"})
    });

    router.get('/editar_cuenta/:id',  async (req, res) => {
        const {id} = req.params;
        const editarCuenta = await pool.query('SELECT * FROM cuentas WHERE CTA_ID = ?',[id]);
        res.render('cuentas/editar_cuenta',{editarCuenta:editarCuenta[0]} );
        
    });

    router.post('/editar_cuenta/:id',  async (req, res) => {
        const {id} = req.params;
        const {cta_banco, cta_numerocuenta, cta_nombre } = req.body;
        const nuevaCuenta ={
            cta_banco, 
            cta_numerocuenta, 
            cta_nombre
        };
        // const editarUsuario = req.body;
        await pool.query('UPDATE cuentas set ? WHERE CTA_ID = ?', [nuevaCuenta,id]);
        //res.json({"message":"Registro Agregado  correctamente"})
        req.flash('success','Cuenta Actualizadada Correctamente');
        res.redirect('/cuentas/listar_cuentas');
    });


module.exports = router;