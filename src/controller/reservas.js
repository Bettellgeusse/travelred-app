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
    const verReserva = await pool.query('SELECT cliente.CLN_NOMBRE, cliente.CLN_CEDULA, cliente.CLN_CELULAR, tour.TOU_NOMBRE, tour.TOU_FECHA, RES_ACOM, RES_EXTRA, RES_ABONO1,RES_ABONO2,RES_ABONO3,RES_OBSERVACIONES,RES_FECHA_ABONO1,RES_FECHA_ABONO2,RES_FECHA_ABONO3 From cliente INNER JOIN reserva ON reserva.CLN_ID = cliente.CLN_ID INNER JOIN tour ON reserva.TOU_ID = tour.TOU_ID;');
    //res.render('reservas/listar_reservas', {verReserva:verReserva});
    return res.json(verReserva);
}

const getIdReservas = async (req, res) => {
    const {id} = req.params;
    const listarReserva = await pool.query('SELECT * FROM cuentas WHERE RES_ID = ?',[id]);
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
    await pool.query('UPDATE reserva set ? WHERE RES_ID = ?', [nuevaReserva,id]);
    res.json({"message":"Registro Agregado  correctamente"})
    //req.flash('success','Reserva Actualizada Correctamente');
    //res.redirect('/reservas/listar_reservas');
}

module.exports = { postReservas, getReservas, getIdReservas, deleteReservas, getEditReservas,putReservas}