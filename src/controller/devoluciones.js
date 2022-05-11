const express = require('express');
const router = express.Router();


const pool = require('../database');

const postDevoluciones = async (req, res) => {
    // const {aho_acom, aho_extra, aho_abono1, aho_abono2, aho_abono3, aho_fecha_abono1, aho_fecha_abono2, aho_fecha_abono3,aho_cancelado } = req.body;
    // const nuevaDevolucion ={
    //     aho_acom, 
    //     aho_extra, 
    //     aho_abono1, 
    //     aho_abono2, 
    //     aho_abono3, 
    //     aho_fecha_abono1, 
    //     aho_fecha_abono2, 
    //     aho_fecha_abono3,
    //     aho_cancelado 
    // };
    const nuevaDevolucion = req.body;
    console.log(nuevaDevolucion);
    await pool.query('INSERT INTO devolucion set ?', [nuevaDevolucion]);
    res.json({"message":"Registro Agregado  correctamente"})
    //req.flash('success','Devolucion Agregado Correctamente');
    //res.redirect('/devoluciones/listar_devolucion');
}

const getDevoluciones = async (req, res) => {
    const veradevolucion = await pool.query('SELECT d.DEV_ID ,d.DEV_ACOM,d.DEV_EXTRA,d.DEV_ABONO1,d.DEV_ABONO2,d.DEV_ABONO3,d.DEV_FECHA_ABONO1,d.DEV_FECHA_ABONO2,d.DEV_FECHA_ABONO3,d.DEV_CUEN_ABONO1, d.DEV_CUEN_ABONO2, d.DEV_CUEN_ABONO3, d.DEV_OBSERVACIONES,cue.CTA_NOMBRE AS CTA_NOMBRE1,cue2.CTA_NOMBRE AS CTA_NOMBRE2,cue3.CTA_NOMBRE AS CTA_NOMBRE3,c.CLN_ID, c.CLN_NOMBRE,c.CLN_CEDULA,c.CLN_CELULAR,t.TOU_ID,t.TOU_NOMBRE,t.TOU_FECHA FROM devolucion AS d INNER JOIN cliente AS c ON d.CLN_ID = c.CLN_ID INNER JOIN tour AS t ON d.TOU_ID = t.TOU_ID INNER JOIN cuentas AS cue ON d.DEV_CUEN_ABONO1 = cue.CTA_ID INNER JOIN cuentas AS cue2 ON d.DEV_CUEN_ABONO2 = cue2.CTA_ID INNER JOIN cuentas AS cue3 ON d.DEV_CUEN_ABONO3 = cue3.CTA_ID;');
    //res.render('devoluciones/listar_devolucion', {veradevolucion:veradevolucion});
    return res.json(veradevolucion); 
}

const getIdDevoluciones = async (req, res) => {
    const {id} = req.params;
    const listarDevolucion = await pool.query('SELECT d.DEV_ID ,d.DEV_ACOM,d.DEV_EXTRA,d.DEV_ABONO1,d.DEV_ABONO2,d.DEV_ABONO3,d.DEV_FECHA_ABONO1,d.DEV_FECHA_ABONO2,d.DEV_FECHA_ABONO3,d.DEV_CUEN_ABONO1, d.DEV_CUEN_ABONO2, d.DEV_CUEN_ABONO3, d.DEV_OBSERVACIONES,cue.CTA_NOMBRE AS CTA_NOMBRE1,cue2.CTA_NOMBRE AS CTA_NOMBRE2,cue3.CTA_NOMBRE AS CTA_NOMBRE3,c.CLN_ID, c.CLN_NOMBRE,c.CLN_CEDULA,c.CLN_CELULAR,t.TOU_ID,t.TOU_NOMBRE,t.TOU_FECHA FROM devolucion AS d INNER JOIN cliente AS c ON d.CLN_ID = c.CLN_ID INNER JOIN tour AS t ON d.TOU_ID = t.TOU_ID INNER JOIN cuentas AS cue ON d.DEV_CUEN_ABONO1 = cue.CTA_ID INNER JOIN cuentas AS cue2 ON d.DEV_CUEN_ABONO2 = cue2.CTA_ID INNER JOIN cuentas AS cue3 ON d.DEV_CUEN_ABONO3 = cue3.CTA_ID WHERE DEV_ID = ?',[id]);
    console.log(listarDevolucion[0]);
    return res.json(listarDevolucion[0])
}

const delteteDevoluciones =  async (req, res) => {
    const {id} = req.params;
     await pool.query('DELETE FROM devolucion WHERE DEV_ID = ?',[id]);
    //req.flash('success','Devolucion Eliminado Correctamente');
    //res.redirect('/devoluciones/listar_devolucion');
    res.json({"message":"Registro Eliminado  correctamente"})
}

const getEditDevoluciones = async (req, res) => {
    const {id} = req.params;
    const editarDevolucion = await pool.query('SELECT * FROM devolucion WHERE DEV_ID = ?',[id]);
    res.render('devoluciones/editar_devolucion',{editarDevolucion:editarDevolucion[0]} );
    
}

const putDevoluciones =  async (req, res) => {
    const {id} = req.params;
    // const {aho_acom, aho_extra, aho_abono1, aho_abono2, aho_abono3, aho_fecha_abono1, aho_fecha_abono2, aho_fecha_abono3,aho_cancelado } = req.body;
    // const nuevaDevolucion ={
    //     aho_acom, 
    //     aho_extra, 
    //     aho_abono1, 
    //     aho_abono2, 
    //     aho_abono3, 
    //     aho_fecha_abono1, 
    //     aho_fecha_abono2, 
    //     aho_fecha_abono3,
    //     aho_cancelado 
    // };
    const nuevaDevolucion = req.body;
    await pool.query('UPDATE devolucion set ? WHERE DEV_ID = ?', [nuevaDevolucion,id]);
    res.json({"message":"Registro Agregado  correctamente"})
    //req.flash('success','Devolucion Actualizado Correctamente');
    //res.redirect('/devoluciones/listar_devolucion');
}



module.exports = { postDevoluciones, getDevoluciones, getIdDevoluciones, delteteDevoluciones, getEditDevoluciones,putDevoluciones}