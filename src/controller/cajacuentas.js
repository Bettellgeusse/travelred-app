const express = require('express');
const router = express.Router();
const pool = require('../database');

//Agregar
const postCajaCuentas = async (req, res) => {
    try {
        const nuevaCajamenor = req.body;
        let saldo = await pool.query('SELECT CJA_SALDO FROM cajacuentas WHERE CJA_ID=(SELECT MAX(CJA_ID) FROM cajacuentas)');
        saldo= saldo[0].CJA_SALDO;
        let nuevosaldo = saldo-nuevaCajamenor.CJA_EGRESO+nuevaCajamenor.CJA_INGRESO
        nuevaCajamenor.CJA_SALDO = nuevosaldo;
        console.log(nuevaCajamenor);
        await pool.query('INSERT INTO cajacuentas set ?', [nuevaCajamenor]);
        res.json({"message":"Registro Agregado  correctamente"})
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query Agregar CajaCuentas",
        "Error":error })
    }
}
//Listar
const getCajaCuentas = async (req, res) => {
    try {
        const verCajacuentas = await pool.query('SELECT caj.CJA_ID, caj.CJA_CUENTAS, cue.CTA_BANCO, cue.CTA_NUMEROCUENTA, cue.CTA_NOMBRE, caj.CJA_FECHA, caj.CJA_BENEFICIARIO, caj.CJA_CONCEPTO, caj.CJA_INGRESO, caj.CJA_EGRESO, caj.CJA_SALDO FROM cajacuentas AS caj INNER JOIN cuentas AS cue ON caj.CJA_CUENTAS = cue.CTA_ID');
        return res.json(verCajacuentas);
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query listar CajaCuentas",
        "Error":error })
    }
}
//Listar por id
const getIdCajaCuentas = async (req, res) => {
    try {
        const {id} = req.params;
        const listarCajaCuentas = await pool.query('SELECT caj.CJA_ID, caj.CJA_CUENTAS, cue.CTA_BANCO, cue.CTA_NUMEROCUENTA, cue.CTA_NOMBRE, caj.CJA_FECHA, caj.CJA_BENEFICIARIO, caj.CJA_CONCEPTO, caj.CJA_INGRESO, caj.CJA_EGRESO, caj.CJA_SALDO FROM cajacuentas AS caj INNER JOIN cuentas AS cue ON caj.CJA_CUENTAS = cue.CTA_ID  = ?',[id]);
        console.log(listarCajaCuentas[0]);
        return res.json(listarCajaCuentas[0])
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query listar id CajaCuentas",
        "Error":error })
    }
}
//Eliminar
const deleteCajaCuentas = async (req, res) => {
    try {
        const {id} = req.params;
        await pool.query('DELETE FROM cajacuentas WHERE CJA_ID  = ?',[id]);
        res.json({"message":"Registro Eliminado  correctamente"})
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query eliminar CajaCuentas",
        "Error":error })
    }
}
//Editar get
const editarCajaCuentas = async (req, res) => {
    try {
        const {id} = req.params;
        const editarCajacuentas = await pool.query('SELECT * FROM cajacuentas WHERE CJA_ID = ?',[id]);
        res.render('cajamenor/editar_cajamenor',{editarCajacuentas:editarCajacuentas[0]} );
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query editar get CajaCuentas",
        "Error":error })
    }
}
//Editar post
const putCajaCuentas =  async (req, res) => {
    try {
        const {id} = req.params;
        const nuevaCajacuentas = req.body;
        await pool.query('UPDATE cajacuentas set ? WHERE CJA_ID = ?', [nuevaCajacuentas,id]);
        res.json({"message":"Registro Agregado  correctamente"})
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query editar post CajaCuentas",
        "Error":error })
    }

}

module.exports = { postCajaCuentas, getCajaCuentas, getIdCajaCuentas, deleteCajaCuentas, editarCajaCuentas,putCajaCuentas}