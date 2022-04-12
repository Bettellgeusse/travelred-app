const express = require('express');
const router = express.Router();


const pool = require('../database');

const postCuentas = async (req, res) => {
    // const {cta_banco, cta_numerocuenta, cta_nombre } = req.body;
    // const nuevaCuenta ={
    //     cta_banco, 
    //     cta_numerocuenta, 
    //     cta_nombre
    // };
    const nuevaCuenta = req.body;
    console.log(nuevaCuenta);
    await pool.query('INSERT INTO cuentas set ?', [nuevaCuenta]);
    res.json({"message":"Registro Agregado  correctamente"})
    //req.flash('success','Cuenta Agregada Correctamente');
    //res.redirect('/cuentas/listar_cuentas');
}

const getCuentas = async (req, res) => {
    const vercuenta = await pool.query('SELECT * FROM cuentas');
    //res.render('cuentas/listar_cuentas', {vercuenta:vercuenta});
    return res.json(vercuenta);
}

const getIdCuentas = async (req, res) => {
    const {id} = req.params;
    const listarCuenta = await pool.query('SELECT * FROM cuentas WHERE CTA_ID = ?',[id]);
    console.log(listarCuenta[0]);
    return res.json(listarCuenta[0])
}

const deleteCuentas =async (req, res) => {
    const {id} = req.params;
     await pool.query('DELETE FROM cuentas WHERE CTA_ID = ?',[id]);
    //req.flash('success','Cuenta Eliminada Correctamente');
    //res.redirect('/cuentas/listar_cuentas');
    res.json({"message":"Registro Eliminado  correctamente"})
}

const getEditarCuentas = async (req, res) => {
    const {id} = req.params;
    const editarCuenta = await pool.query('SELECT * FROM cuentas WHERE CTA_ID = ?',[id]);
    res.render('cuentas/editar_cuenta',{editarCuenta:editarCuenta[0]} );
    
}

const putCuentas = async (req, res) => {
    const {id} = req.params;
    // const {cta_banco, cta_numerocuenta, cta_nombre } = req.body;
    // const nuevaCuenta ={
    //     cta_banco, 
    //     cta_numerocuenta, 
    //     cta_nombre
    // };
    const editarUsuario = req.body;
    await pool.query('UPDATE cuentas set ? WHERE CTA_ID = ?', [editarUsuario,id]);
    res.json({"message":"Registro Agregado  correctamente"})
    //req.flash('success','Cuenta Actualizadada Correctamente');
    //res.redirect('/cuentas/listar_cuentas');
}


module.exports = { postCuentas, getCuentas, getIdCuentas, deleteCuentas, getEditarCuentas,putCuentas}