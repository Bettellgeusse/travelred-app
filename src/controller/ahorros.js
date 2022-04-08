const express = require('express');
const router = express.Router();


const pool = require('../database');

const postAhorro = async (req, res) => {
    const {aho_acom, aho_extra, aho_abono1, aho_abono2, aho_abono3, aho_fecha_abono1, aho_fecha_abono2, aho_fecha_abono3 } = req.body;
    const nuevoAhorro ={
        aho_acom, 
        aho_extra, 
        aho_abono1, 
        aho_abono2, 
        aho_abono3, 
        aho_fecha_abono1, 
        aho_fecha_abono2, 
        aho_fecha_abono3 
    };
    //const nuevoUsuario = req.body;
    console.log(nuevoAhorro);
    await pool.query('INSERT INTO ahorro set ?', [nuevoAhorro]);
    //res.json({"message":"Registro Agregado  correctamente"})
    req.flash('success','Ahorro Agregado Correctamente');
    res.redirect('/ahorro/lista_ahorros');
}


const getAhorro = async (req, res) => {
    const verahorro = await pool.query('SELECT * FROM ahorro');
    //res.render('ahorro/lista_ahorros', {verahorro:verahorro});
    return res.json(verahorro);
}

const deleteAhorro = async (req, res) => {
    const {id} = req.params;
     await pool.query('DELETE FROM ahorro WHERE DEV_ID2 = ?',[id]);
    req.flash('success','Ahorro Eliminado Correctamente');
    res.redirect('/ahorro/lista_ahorros');
    //res.json({"message":"Registro Eliminado  correctamente"})
}

const getEditAhorro =  async (req, res) => {
    const {id} = req.params;
    const editarAhorro = await pool.query('SELECT * FROM ahorro WHERE DEV_ID2 = ?',[id]);
    res.render('ahorro/editar_ahorro',{editarAhorro:editarAhorro[0]} );
    
}

const putahorro = async (req, res) => {
    const {id} = req.params;
    const {aho_acom, aho_extra, aho_abono1, aho_abono2, aho_abono3, aho_fecha_abono1, aho_fecha_abono2, aho_fecha_abono3 } = req.body;
    const editarAhorro ={
        aho_acom, 
        aho_extra, 
        aho_abono1, 
        aho_abono2, 
        aho_abono3, 
        aho_fecha_abono1, 
        aho_fecha_abono2, 
        aho_fecha_abono3 
    };
    // const editarUsuario = req.body;
    await pool.query('UPDATE ahorro set ? WHERE DEV_ID2 = ?', [editarAhorro,id]);
    //res.json({"message":"Registro Agregado  correctamente"})
    req.flash('success','Ahorro Actualizado Correctamente');
    res.redirect('/ahorro/lista_ahorros');
}

module.exports = { postAhorro, getAhorro, deleteAhorro, getEditAhorro, putahorro}