const express = require('express');
const router = express.Router();


const pool = require('../database');

const posCajaMayor = async (req, res) => {
    try {
        const nuevaCajamayor = req.body;
        await pool.query('INSERT INTO cajamayor set ?', [nuevaCajamayor]);
        res.json({"message":"Registro Agregado  correctamente"})
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query Agregar CajaMayor",
        "Error":error })
    }

}

const getCajaMayor = async (req, res) => {
    try {
        const verCajamayor = await pool.query('SELECT * FROM cajamayor');
        return res.json(verCajamayor);
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query listar CajaMayor",
        "Error":error })
    }

}

const getIdCajaMayor = async (req, res) => {
    try {
        const {id} = req.params;
        const listarCajaMayor = await pool.query('SELECT * FROM cajamayor WHERE CJA_ID  = ?',[id]);
        console.log(listarCajaMayor[0]);
        return res.json(listarCajaMayor[0])
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query listar id CajaMayor",
        "Error":error })
    }

}

const deleteCajaMayor = async (req, res) => {
    try {
        const {id} = req.params;
        await pool.query('DELETE FROM cajamayor WHERE CJA_ID  = ?',[id]);
        res.json({"message":"Registro Eliminado  correctamente"})
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query eliminar CajaMayor",
        "Error":error })
    }

}

const getEditCajaMayor = async (req, res) => {
    try {
        const {id} = req.params;
        const editarCajamayor = await pool.query('SELECT * FROM cajamayor WHERE CJA_ID = ?',[id]);
        res.render('cajamayor/editar_cajamayor',{editarCajamayor:editarCajamayor[0]} );
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query editar get CajaMayor",
        "Error":error })
    }


}

const putCajaMayor = async (req, res) => {
    try {
        const {id} = req.params;
        const nuevaCajamayor = req.body;
        await pool.query('UPDATE cajamayor set ? WHERE CJA_ID = ?', [nuevaCajamayor,id]);
        res.json({"message":"Registro Agregado  correctamente"})
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query editar post CajaMayor",
        "Error":error })
    }

}

module.exports = { posCajaMayor, getCajaMayor, getIdCajaMayor, deleteCajaMayor, getEditCajaMayor,putCajaMayor}