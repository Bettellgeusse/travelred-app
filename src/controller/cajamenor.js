const express = require('express');
const router = express.Router();


const pool = require('../database');

const postCajaMenor = async (req, res) => {
    // const {cja_fecha, cja_Beneficiario, cja_concepto, cja_tipo,cja_valor,cja_estado } = req.body;
    // const nuevaCajamenor ={
    //     cja_fecha, 
    //     cja_Beneficiario,
    //     cja_concepto, 
    //     cja_tipo,
    //     cja_valor,
    //     cja_estado
    // };
    const nuevaCajamenor = req.body;
    console.log(nuevaCajamenor);
    await pool.query('INSERT INTO cajamenor set ?', [nuevaCajamenor]);
    res.json({"message":"Registro Agregado  correctamente"})
    //req.flash('success','Agregada Correctamente');
    //res.redirect('/cajamenor/listar_cajamenor');
}

const getCajaMenor = async (req, res) => {
    const verCajamenor = await pool.query('SELECT * FROM cajamenor');
    //res.render('cajamenor/listar_cajamenor', {verCajamenor:verCajamenor});
    return res.json(verCajamenor);
}

const getIdCajaMenor = async (req, res) => {
    const {id} = req.params;
    const listarCajaMenor = await pool.query('SELECT * FROM cajamenor WHERE CJA_ID  = ?',[id]);
    console.log(listarCajaMenor[0]);
    return res.json(listarCajaMenor[0])
}

const deleteCajaMenor = async (req, res) => {
    const {id} = req.params;
     await pool.query('DELETE FROM cajamenor WHERE CJA_ID  = ?',[id]);
    //req.flash('success','Eliminada Correctamente');
    //res.redirect('/cajamenor/listar_cajamenor');
    res.json({"message":"Registro Eliminado  correctamente"})
}

const editarCajaMenor = async (req, res) => {
    const {id} = req.params;
    const editarCajamenor = await pool.query('SELECT * FROM cajamenor WHERE CJA_ID = ?',[id]);
    res.render('cajamenor/editar_cajamenor',{editarCajamenor:editarCajamenor[0]} );
    
}

const putCajaMenor =  async (req, res) => {
    const {id} = req.params;
    // const {cja_fecha, cja_Beneficiario, cja_concepto, cja_tipo,cja_valor,cja_estado } = req.body;
    // const nuevaCajamenor ={
    //     cja_fecha, 
    //     cja_Beneficiario,
    //     cja_concepto, 
    //     cja_tipo,
    //     cja_valor,
    //     cja_estado
    // };
    const nuevaCajamenor = req.body;
    await pool.query('UPDATE cajamenor set ? WHERE CJA_ID = ?', [nuevaCajamenor,id]);
    res.json({"message":"Registro Agregado  correctamente"})
    //req.flash('success','Actualizada Correctamente');
    //res.redirect('/cajamenor/listar_cajamenor');
}

module.exports = { postCajaMenor, getCajaMenor, getIdCajaMenor, deleteCajaMenor, editarCajaMenor,putCajaMenor}