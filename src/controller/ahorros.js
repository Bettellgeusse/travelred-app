const express = require('express');
const router = express.Router();
const pool = require('../database');

//Agregar
const postAhorro = async (req, res) => {
    try {
        const nuevoAhorro = req.body;
        console.log(nuevoAhorro);
        await pool.query('INSERT INTO ahorro set ?', [nuevoAhorro]);
        res.json({"message":"Registro Agregado  correctamente"})
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query Agregar Ahorro",
        "Error":error })
    }
}
//Listar
const getAhorro = async (req, res) => {
    try {
        const verahorro = await pool.query('SELECT a.AHO_ID ,a.AHO_ACOM,a.AHO_EXTRA,a.AHO_ABONO1,a.AHO_ABONO2,a.AHO_ABONO3,a.AHO_FECHA_ABONO1,a.AHO_FECHA_ABONO2,a.AHO_FECHA_ABONO3,a.AHO_CUEN_ABONO1, a.AHO_CUEN_ABONO2, a.AHO_CUEN_ABONO3, a.AHO_OBSERVACIONES,  cue.CTA_NOMBRE AS CTA_NOMBRE1,cue2.CTA_NOMBRE AS CTA_NOMBRE2,cue3.CTA_NOMBRE AS CTA_NOMBRE3,c.CLN_ID, c.CLN_NOMBRE,c.CLN_CEDULA,c.CLN_CELULAR,t.TOU_ID,t.TOU_NOMBRE,t.TOU_FECHA,t.TOU_VALORNETO FROM ahorro AS a INNER JOIN cliente AS c ON a.CLN_ID = c.CLN_ID INNER JOIN tour AS t ON a.TOU_ID = t.TOU_ID INNER JOIN cuentas AS cue ON AHO_CUEN_ABONO1 = cue.CTA_ID INNER JOIN cuentas AS cue2 ON a.AHO_CUEN_ABONO2 = cue2.CTA_ID INNER JOIN cuentas AS cue3 ON a.AHO_CUEN_ABONO3 = cue3.CTA_ID;');
        console.log(verahorro)
        res.json(verahorro);
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query Agregar Ahorro",
        "Error":error })
    }
}
//Listar por id
const getIdAhorro = async (req, res) => {
    try {
        const {id} = req.params;
        const listarAhorro = await pool.query('SELECT a.AHO_ID ,a.AHO_ACOM,a.AHO_EXTRA,a.AHO_ABONO1,a.AHO_ABONO2,a.AHO_ABONO3,a.AHO_FECHA_ABONO1,a.AHO_FECHA_ABONO2,a.AHO_FECHA_ABONO3,a.AHO_CUEN_ABONO1, a.AHO_CUEN_ABONO2, a.AHO_CUEN_ABONO3, a.AHO_OBSERVACIONES,  cue.CTA_NOMBRE AS CTA_NOMBRE1,cue2.CTA_NOMBRE AS CTA_NOMBRE2,cue3.CTA_NOMBRE AS CTA_NOMBRE3,c.CLN_ID, c.CLN_NOMBRE,c.CLN_CEDULA,c.CLN_CELULAR,t.TOU_ID,t.TOU_NOMBRE,t.TOU_FECHA,t.TOU_VALORNETO FROM ahorro AS a INNER JOIN cliente AS c ON a.CLN_ID = c.CLN_ID INNER JOIN tour AS t ON a.TOU_ID = t.TOU_ID INNER JOIN cuentas AS cue ON AHO_CUEN_ABONO1 = cue.CTA_ID INNER JOIN cuentas AS cue2 ON a.AHO_CUEN_ABONO2 = cue2.CTA_ID INNER JOIN cuentas AS cue3 ON a.AHO_CUEN_ABONO3 = cue3.CTA_ID WHERE AHO_ID = ?',[id]);
        return res.json(listarAhorro[0])
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query Agregar Ahorro",
        "Error":error })
    }
}
//Eliminar
const deleteAhorro = async (req, res) => {
    try {
        const {id} = req.params;
        await pool.query('DELETE FROM ahorro WHERE AHO_ID = ?',[id]);
        res.json({"message":"Registro Eliminado  correctamente"})
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query Eliminar Ahorro",
        "Error":error })
    }

}
//Editar get
const getEditAhorro =  async (req, res) => {
    try {
        const {id} = req.params;
        const editarAhorro = await pool.query('SELECT * FROM ahorro WHERE AHO_ID = ?',[id]);
        res.render('ahorro/editar_ahorro',{editarAhorro:editarAhorro[0]} );
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query Agregar Ahorro",
        "Error":error })
    }
}
//Editar post
const putahorro = async (req, res) => {
    try {
        const {id} = req.params;
        const editarAhorro = req.body;
        await pool.query('UPDATE ahorro set ? WHERE AHO_ID = ?', [editarAhorro,id]);
        res.json({"message":"Registro Agregado  correctamente"})
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query Agregar Ahorro",
        "Error":error })
    }
}

module.exports = { postAhorro, getAhorro, deleteAhorro, getEditAhorro, putahorro, getIdAhorro}