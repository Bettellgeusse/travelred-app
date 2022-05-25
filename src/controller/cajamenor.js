const express = require('express');
const router = express.Router();
const pool = require('../database');

//Agregar
const postCajaMenor = async (req, res) => {
    try {
        const nuevaCajamenor = req.body;
        // console.log(nuevaCajamenor);
        // nuevaCajamenor.CJA_SALDO = nuevaCajamenor.CJA_SALDO_ANTERIOR+nuevaCajamenor.CJA_INGRESO-nuevaCajamenor.CJA_EGRESO;
        // delete nuevaCajamenor.CJA_SALDO_ANTERIOR;
        console.log(nuevaCajamenor);
        await pool.query('INSERT INTO cajamenor set ?', [nuevaCajamenor]);
        res.json({"message":"Registro Agregado  correctamente"})
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query Agregar CajaMenor",
        "Error":error })
    }
}
//Listar
const getCajaMenor = async (req, res) => {
    try {
        const verCajamenor = await pool.query('SELECT * FROM cajamenor');
        return res.json(verCajamenor);
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query listar CajaMenor",
        "Error":error })
    }
}
//Listar por id
const getIdCajaMenor = async (req, res) => {
    try {
        const {id} = req.params;
        const listarCajaMenor = await pool.query('SELECT * FROM cajamenor WHERE CJA_ID  = ?',[id]);
        console.log(listarCajaMenor[0]);
        return res.json(listarCajaMenor[0])
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query listar id CajaMenor",
        "Error":error })
    }
}
//Eliminar
const deleteCajaMenor = async (req, res) => {
    try {
        const {id} = req.params;
        await pool.query('DELETE FROM cajamenor WHERE CJA_ID  = ?',[id]);
        res.json({"message":"Registro Eliminado  correctamente"})
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query eliminar CajaMenor",
        "Error":error })
    }
}
//Editar get
const editarCajaMenor = async (req, res) => {
    try {
        const {id} = req.params;
        const editarCajamenor = await pool.query('SELECT * FROM cajamenor WHERE CJA_ID = ?',[id]);
        res.render('cajamenor/editar_cajamenor',{editarCajamenor:editarCajamenor[0]} );
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query editar get CajaMenor",
        "Error":error })
    }
}
//Editar post
const putCajaMenor =  async (req, res) => {
    try {
        const {id} = req.params;
        const nuevaCajamenor = req.body;
        await pool.query('UPDATE cajamenor set ? WHERE CJA_ID = ?', [nuevaCajamenor,id]);
        res.json({"message":"Registro Agregado  correctamente"})
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query editar post CajaMenor",
        "Error":error })
    }

}

module.exports = { postCajaMenor, getCajaMenor, getIdCajaMenor, deleteCajaMenor, editarCajaMenor,putCajaMenor}