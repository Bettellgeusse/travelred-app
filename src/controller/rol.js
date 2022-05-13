const express = require('express');
const router = express.Router();


const pool = require('../database');

const postRol = async (req, res) => {
    try {
        const nuevoRol = req.body;
        console.log(nuevoRol);
        await pool.query('INSERT INTO rol set ?', [nuevoRol]);
        res.json({"message":"Registro Agregado  correctamente"})
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query Agregar rol",
        "Error":error })
    } 
}

const getRol = async (req, res) => {
    try {
        const verRol = await pool.query('SELECT * FROM rol');
        return res.json(verRol);
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query listar rol",
        "Error":error })
    }
}

const getIdRol = async (req, res) => {
    try {
        const {id} = req.params;
        const listarRol = await pool.query('SELECT * FROM rol WHERE ROL_ID = ?',[id]);
        console.log(listarRol[0]);
        return res.json(listarRol[0])
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query listar id rol",
        "Error":error })
    }
}

const getCedulaRol = async (req, res) => {
    try {
        const {cedula} = req.params;
        const listarRol = await pool.query('SELECT * FROM rol WHERE ROL_CEDULA = ?',[cedula]);
        console.log(listarRol[0]);
        return res.json(listarRol[0])
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query listar cedula rol",
        "Error":error })
    }
}

const deleteRol = async (req, res) => {
    try {
        const {id} = req.params;
        await pool.query('DELETE FROM rol WHERE ROL_ID = ?',[id]);
        res.json({"message":"Registro Eliminado  correctamente"})
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query eliminar rol",
        "Error":error })
    }
}

const getEditRol = async (req, res) => {
    try {
        const {id} = req.params;
        const editarRol = await pool.query('SELECT * FROM rol WHERE ROL_ID = ?',[id]);
        console.log(editarRol[0]);
        return res.json(editarRol[0])
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query editar get rol",
        "Error":error })
    }
}

const putRol =   async (req, res) => {
    try {
        const {id} = req.params;
        const editarRol = req.body;
        await pool.query('UPDATE rol set ? WHERE ROL_ID = ?', [editarRol,id]);
        res.json({"message":"Registro Agregado  correctamente"})
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query editar post rol",
        "Error":error })
    }
}

module.exports = { postRol, getRol, getIdRol, getCedulaRol, deleteRol,getEditRol, putRol}