const express = require('express');
const router = express.Router();


const pool = require('../database');

const postCuentas = async (req, res) => {
    try {
        const nuevaCuenta = req.body;
        console.log(nuevaCuenta);
        await pool.query('INSERT INTO cuentas set ?', [nuevaCuenta]);
        res.json({"message":"Registro Agregado  correctamente"})
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query Agregar Cuenta",
        "Error":error })
    }
}

const getCuentas = async (req, res) => {
    try {
        const vercuenta = await pool.query('SELECT * FROM cuentas');
        return res.json(vercuenta);
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query listar Cuenta",
        "Error":error })
    }
}

const getIdCuentas = async (req, res) => {
    try {
        const {id} = req.params;
        const listarCuenta = await pool.query('SELECT * FROM cuentas WHERE CTA_ID = ?',[id]);
        console.log(listarCuenta[0]);
        return res.json(listarCuenta[0])
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query listar id Cuenta",
        "Error":error })
    }
}

const deleteCuentas =async (req, res) => {
    try {
        const {id} = req.params;
        await pool.query('DELETE FROM cuentas WHERE CTA_ID = ?',[id]);
        res.json({"message":"Registro Eliminado  correctamente"})
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query eliminar Cuenta",
        "Error":error })
    }
}

const getEditarCuentas = async (req, res) => {
    try {
        const {id} = req.params;
        const editarCuenta = await pool.query('SELECT * FROM cuentas WHERE CTA_ID = ?',[id]);
        res.render('cuentas/editar_cuenta',{editarCuenta:editarCuenta[0]} );
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query editar get Cuenta",
        "Error":error })
    }  
}

const putCuentas = async (req, res) => {
    try {
        const {id} = req.params;
        const editarUsuario = req.body;
        await pool.query('UPDATE cuentas set ? WHERE CTA_ID = ?', [editarUsuario,id]);
        res.json({"message":"Registro Agregado  correctamente"})
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query editar post Cuenta",
        "Error":error })
    }
}


module.exports = { postCuentas, getCuentas, getIdCuentas, deleteCuentas, getEditarCuentas,putCuentas}