const express = require('express');
const router = express.Router();
const pool = require('../database');

//Agregar
const postCliente = async (req, res) => {
    try {
        const nuevoUsuario = req.body;
        console.log(nuevoUsuario);
        await pool.query('INSERT INTO cliente set ?', [nuevoUsuario]);
        res.json({"message":"Registro Agregado  correctamente"})
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query Agregar Cliente",
        "Error":error })
    } 
}
//Listar
const getCliente = async (req, res) => {
    try {
        const vercliente = await pool.query('SELECT * FROM cliente');
        return res.json(vercliente);
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query listar Cliente",
        "Error":error })
    }

}
//Listar por id
const getIdCliente = async (req, res) => {
    try {
        const {id} = req.params;
        const listarcliente = await pool.query('SELECT * FROM cliente WHERE CLN_ID = ?',[id]);
        console.log(listarcliente[0]);
        return res.json(listarcliente[0])
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query listar id Cliente",
        "Error":error })
    }
}
//Listar por cedula
const getCedulaCLiente = async (req, res) => {
    try {
        const {cedula} = req.params;
        const listarcliente = await pool.query('SELECT * FROM cliente WHERE CLN_CEDULA = ?',[cedula]);
        console.log(listarcliente[0]);
        return res.json(listarcliente[0])
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query listar cedula Cliente",
        "Error":error })
    }
}
//Eliminar
const deleteCliente = async (req, res) => {
    try {
        const {id} = req.params;
        await pool.query('DELETE FROM cliente WHERE CLN_ID = ?',[id]);
        res.json({"message":"Registro Eliminado  correctamente"})
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query eliminar Cliente",
        "Error":error })
    }
}
//Editar get
const getEditCliente = async (req, res) => {
    try {
        const {id} = req.params;
        const editarcliente = await pool.query('SELECT * FROM cliente WHERE CLN_ID = ?',[id]);
        console.log(editarcliente[0]);
        return res.json(editarcliente[0])
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query editar get Cliente",
        "Error":error })
    }
}
//Editar post
const putCliente =   async (req, res) => {
    try {
        const {id} = req.params;
        const editarUsuario = req.body;
        await pool.query('UPDATE cliente set ? WHERE CLN_ID = ?', [editarUsuario,id]);
        res.json({"message":"Registro Agregado  correctamente"})
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query editar post Cliente",
        "Error":error })
    }
}

module.exports = { postCliente, getCliente, getIdCliente, getCedulaCLiente, deleteCliente,getEditCliente, putCliente}