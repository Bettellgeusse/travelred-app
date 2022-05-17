const express = require('express');
const router = express.Router();
const pool = require('../database');

//Agregar
const postDevoluciones = async (req, res) => {
    try {
        const nuevaDevolucion = req.body;
        console.log(nuevaDevolucion);
        await pool.query('INSERT INTO devolucion set ?', [nuevaDevolucion]);
        res.json({"message":"Registro Agregado  correctamente"})
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query Agregar Devoluciones",
        "Error":error })
    }
}
//Listar
const getDevoluciones = async (req, res) => {
    try {
        const veradevolucion = await pool.query('SELECT d.DEV_ID ,d.DEV_ACOM,d.DEV_EXTRA,d.DEV_ABONO1,d.DEV_ABONO2,d.DEV_ABONO3,d.DEV_FECHA_ABONO1,d.DEV_FECHA_ABONO2,d.DEV_FECHA_ABONO3,d.DEV_CUEN_ABONO1, d.DEV_CUEN_ABONO2, d.DEV_CUEN_ABONO3, d.DEV_OBSERVACIONES, d.GRP_ID, (SELECT CLN_NOMBRE FROM cliente WHERE CLN_ID = g.CLN_ID ) AS LIDER, g.CLN_ID AS LIDER_G, g.GRP_VALORTOTAL, g.GRP_VALORSALDO, cue.CTA_NOMBRE AS CTA_NOMBRE1,cue2.CTA_NOMBRE AS CTA_NOMBRE2,cue3.CTA_NOMBRE AS CTA_NOMBRE3,c.CLN_ID, c.CLN_NOMBRE,c.CLN_CEDULA,c.CLN_CELULAR,t.TOU_ID,t.TOU_NOMBRE,t.TOU_FECHA, t.TOU_VALORNETO  FROM devolucion AS d INNER JOIN cliente AS c ON d.CLN_ID = c.CLN_ID INNER JOIN tour AS t ON d.TOU_ID = t.TOU_ID INNER JOIN cuentas AS cue ON d.DEV_CUEN_ABONO1 = cue.CTA_ID INNER JOIN cuentas AS cue2 ON d.DEV_CUEN_ABONO2 = cue2.CTA_ID INNER JOIN cuentas AS cue3 ON d.DEV_CUEN_ABONO3 = cue3.CTA_ID INNER JOIN grupo AS g ON d.GRP_ID = g.GRP_ID;');
        return res.json(veradevolucion); 
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query listar Devoluciones",
        "Error":error })
    }
}
//Listar por id
const getIdDevoluciones = async (req, res) => {
    try {
        const {id} = req.params;
        const listarDevolucion = await pool.query('SELECT d.DEV_ID ,d.DEV_ACOM,d.DEV_EXTRA,d.DEV_ABONO1,d.DEV_ABONO2,d.DEV_ABONO3,d.DEV_FECHA_ABONO1,d.DEV_FECHA_ABONO2,d.DEV_FECHA_ABONO3,d.DEV_CUEN_ABONO1, d.DEV_CUEN_ABONO2, d.DEV_CUEN_ABONO3, d.DEV_OBSERVACIONES, d.GRP_ID, (SELECT CLN_NOMBRE FROM cliente WHERE CLN_ID = g.CLN_ID ) AS LIDER, g.CLN_ID AS LIDER_G, g.GRP_VALORTOTAL, g.GRP_VALORSALDO, cue.CTA_NOMBRE AS CTA_NOMBRE1,cue2.CTA_NOMBRE AS CTA_NOMBRE2,cue3.CTA_NOMBRE AS CTA_NOMBRE3,c.CLN_ID, c.CLN_NOMBRE,c.CLN_CEDULA,c.CLN_CELULAR,t.TOU_ID,t.TOU_NOMBRE,t.TOU_FECHA, t.TOU_VALORNETO  FROM devolucion AS d INNER JOIN cliente AS c ON d.CLN_ID = c.CLN_ID INNER JOIN tour AS t ON d.TOU_ID = t.TOU_ID INNER JOIN cuentas AS cue ON d.DEV_CUEN_ABONO1 = cue.CTA_ID INNER JOIN cuentas AS cue2 ON d.DEV_CUEN_ABONO2 = cue2.CTA_ID INNER JOIN cuentas AS cue3 ON d.DEV_CUEN_ABONO3 = cue3.CTA_ID INNER JOIN grupo AS g ON d.GRP_ID = g.GRP_ID WHERE DEV_ID = ?',[id]);
        console.log(listarDevolucion[0]);
        return res.json(listarDevolucion[0])
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query listar id Devoluciones",
        "Error":error })
    }
}
//Eliminar
const delteteDevoluciones =  async (req, res) => {
    try {
        const {id} = req.params;
        await pool.query('DELETE FROM devolucion WHERE DEV_ID = ?',[id]);
        res.json({"message":"Registro Eliminado  correctamente"})
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query eliminar Devoluciones",
        "Error":error })
    }
}
//Editar get
const getEditDevoluciones = async (req, res) => {
    try {
        const {id} = req.params;
        const editarDevolucion = await pool.query('SELECT * FROM devolucion WHERE DEV_ID = ?',[id]);
        res.render('devoluciones/editar_devolucion',{editarDevolucion:editarDevolucion[0]} );
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query editar get Devoluciones",
        "Error":error })
    }
}
//Editar post
const putDevoluciones =  async (req, res) => {
    try {
        const {id} = req.params;
        const nuevaDevolucion = req.body;
        await pool.query('UPDATE devolucion set ? WHERE DEV_ID = ?', [nuevaDevolucion,id]);
        res.json({"message":"Registro Agregado  correctamente"})
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query editar post Devoluciones",
        "Error":error })
    }
}



module.exports = { postDevoluciones, getDevoluciones, getIdDevoluciones, delteteDevoluciones, getEditDevoluciones,putDevoluciones}