const express = require('express');
const router = express.Router();


const pool = require('../database');

const postReservas = async (req, res) => {
    // const {res_cuen,res_acom, res_extra, res_abono1, res_abono2,res_abono3,res_observaciones,res_fecha_abono1,res_fecha_abono2,res_fecha_abono3 } = req.body;
    // const nuevaReserva ={
    //     res_cuen,
    //     res_acom, 
    //     res_extra, 
    //     res_abono1, 
    //     res_abono2,
    //     res_abono3,
    //     res_observaciones,
    //     res_fecha_abono1,
    //     res_fecha_abono2,
    //     res_fecha_abono3
    // };
    const nuevaReserva = req.body;
    console.log(nuevaReserva);
    await pool.query('INSERT INTO reserva set ?', [nuevaReserva]);
    res.json({"message":"Registro Agregado  correctamente"})
    //req.flash('success','Reserva Agregada Correctamente');
    //res.redirect('/reservas/listar_reservas');
}

const getReservas = async (req, res) => {
    //const verReserva = await pool.query('SELECT * FROM reserva');
    //const verReserva = await pool.query('SELECT CLN_NOMBRE, CLN_CEDULA, 	RES_ACOM, RES_EXTRA, RES_ABONO1,RES_ABONO2,RES_ABONO3,RES_OBSERVACIONES,RES_FECHA_ABONO1,RES_FECHA_ABONO2,RES_FECHA_ABONO3 From cliente INNER JOIN reserva ON reserva.CLN_ID = cliente.CLN_ID');
    const verReserva = await pool.query('SELECT r.RES_ID, r.RES_ACOM,r.RES_EXTRA,r.RES_ABONO1,r.RES_ABONO2,r.RES_ABONO3,r.RES_OBSERVACIONES,r.RES_FECHA_ABONO1,r.RES_FECHA_ABONO2,r.RES_FECHA_ABONO3,r.RES_CUEN_ABONO1,cue.CTA_NOMBRE AS CTA_NOMBRE1,r.RES_CUEN_ABONO2,cue2.CTA_NOMBRE AS CTA_NOMBRE2,r.RES_CUEN_ABONO3,cue3.CTA_NOMBRE AS CTA_NOMBRE3,c.CLN_NOMBRE,c.CLN_CEDULA,c.CLN_CELULAR,t.TOU_NOMBRE,t.TOU_FECHA FROM reserva AS r INNER JOIN cliente AS c ON r.CLN_ID = c.CLN_ID INNER JOIN tour AS t ON r.TOU_ID = t.TOU_ID INNER JOIN cuentas AS cue ON r.RES_CUEN_ABONO1 = cue.CTA_ID INNER JOIN cuentas AS cue2 ON r.RES_CUEN_ABONO2 = cue2.CTA_ID INNER JOIN cuentas AS cue3 ON r.RES_CUEN_ABONO3 = cue3.CTA_ID;');
    console.log(verReserva);
    //res.render('reservas/listar_reservas', {verReserva:verReserva});
    return res.json(verReserva);
}

const getIdReservas = async (req, res) => {
    const {id} = req.params;
    const listarReserva = await pool.query('SELECT r.RES_ID, r.RES_ACOM,r.RES_EXTRA,r.RES_ABONO1,r.RES_ABONO2,r.RES_ABONO3,r.RES_OBSERVACIONES,r.RES_FECHA_ABONO1,r.RES_FECHA_ABONO2,r.RES_FECHA_ABONO3,r.RES_CUEN_ABONO1,cue.CTA_NOMBRE AS CTA_NOMBRE1,r.RES_CUEN_ABONO2,cue2.CTA_NOMBRE AS CTA_NOMBRE2,r.RES_CUEN_ABONO3,cue3.CTA_NOMBRE AS CTA_NOMBRE3,c.CLN_NOMBRE,c.CLN_CEDULA,c.CLN_CELULAR,t.TOU_NOMBRE,t.TOU_FECHA FROM reserva AS r INNER JOIN cliente AS c ON r.CLN_ID = c.CLN_ID INNER JOIN tour AS t ON r.TOU_ID = t.TOU_ID INNER JOIN cuentas AS cue ON r.RES_CUEN_ABONO1 = cue.CTA_ID INNER JOIN cuentas AS cue2 ON r.RES_CUEN_ABONO2 = cue2.CTA_ID INNER JOIN cuentas AS cue3 ON r.RES_CUEN_ABONO3 = cue3.CTA_ID WHERE RES_ID = ?',[id]);
    console.log(listarReserva[0]);
    return res.json(listarReserva[0])
}

const deleteReservas = async (req, res) => {
    const {id} = req.params;
     await pool.query('DELETE FROM reserva WHERE RES_ID  = ?',[id]);
    //req.flash('success','Reserva Eliminada Correctamente');
    //res.redirect('/reservas/listar_reservas');
    res.json({"message":"Registro Eliminado  correctamente"})
}

const getEditReservas = async (req, res) => {
    const {id} = req.params;
    const editarReserva = await pool.query('SELECT * FROM reserva WHERE RES_ID = ?',[id]);
    res.render('reservas/editar_reserva',{editarReserva:editarReserva[0]} );
    
}

const putReservas = async (req, res) => {
    const {id} = req.params;
    // const {res_cuen,res_acom, res_extra, res_abono1, res_abono2,res_abono3,res_observaciones,res_fecha_abono1,res_fecha_abono2,res_fecha_abono3 } = req.body;
    // const nuevaReserva ={
    //     res_cuen
    //     res_acom, 
    //     res_extra, 
    //     res_abono1, 
    //     res_abono2,
    //     res_abono3,
    //     res_observaciones,
    //     res_fecha_abono1,
    //     res_fecha_abono2,
    //     res_fecha_abono3
    // };
    const nuevaReserva = req.body;
    await pool.query('UPDATE reserva set ? WHERE RES_ID = ?', [nuevaReserva,id]);
    res.json({"message":"Registro Agregado  correctamente"})
    //req.flash('success','Reserva Actualizada Correctamente');
    //res.redirect('/reservas/listar_reservas');
}

module.exports = { postReservas, getReservas, getIdReservas, deleteReservas, getEditReservas,putReservas}