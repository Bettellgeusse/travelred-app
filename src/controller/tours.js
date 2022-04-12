const express = require('express');
const router = express.Router();


const pool = require('../database');

const postTours =  async (req, res) => {
    // const {tou_nombre, tou_tipo, tou_valorneto, tou_valorcomisionable,tou_observaciones,tou_fecha } = req.body;
    // const nuevoTour ={
    //     tou_nombre, 
    //     tou_tipo, 
    //     tou_valorneto, 
    //     tou_valorcomisionable,
    //     tou_observaciones,
    //     tou_fecha
    // };
    const nuevoTour = req.body;
    console.log(nuevoTour);
    await pool.query('INSERT INTO tour set ?', [nuevoTour]);
    res.json({"message":"Registro Agregado  correctamente"})
    //req.flash('success','Tour Agregado Correctamente');
    //res.redirect('/tours/listar_tours');
}

const getTours = async (req, res) => {
    const vertours = await pool.query('SELECT * FROM tour');
    //res.render('tours/listar_tours', {vertours:vertours});
    return res.json(vertours);
}

const getIdTours = async (req, res) => {
    const {id} = req.params;
    const listarTours = await pool.query('SELECT * FROM cuentas WHERE TOU_ID = ?',[id]);
    console.log(listarTours[0]);
    return res.json(listarTours[0])
}

const deleteours = async (req, res) => {
    const {id} = req.params;
     await pool.query('DELETE FROM tour WHERE TOU_ID  = ?',[id]);
    //req.flash('success','Tour Eliminado Correctamente');
    //res.redirect('/tours/listar_tours');
    res.json({"message":"Registro Eliminado  correctamente"})
}

const getEditTours = async (req, res) => {
    const {id} = req.params;
    const editarTour = await pool.query('SELECT * FROM tour WHERE TOU_ID = ?',[id]);
    res.render('tours/editar_tour',{editarTour:editarTour[0]} );
    
}

const putTours = async (req, res) => {
    const {id} = req.params;
    // const {tou_nombre, tou_tipo, tou_valorneto, tou_valorcomisionable,tou_observaciones,tou_fecha } = req.body;
    // const nuevoTour ={
    //     tou_nombre, 
    //     tou_tipo, 
    //     tou_valorneto, 
    //     tou_valorcomisionable,
    //     tou_observaciones,
    //     tou_fecha
    // };
    const nuevoTour = req.body;
    await pool.query('UPDATE tour set ? WHERE TOU_ID = ?', [nuevoTour,id]);
    res.json({"message":"Registro Agregado  correctamente"})
    //req.flash('success','Tour Actualizado Correctamente');
    //res.redirect('/tours/listar_tours');
}

module.exports = { postTours, getTours, getIdTours, deleteours, getEditTours,putTours}