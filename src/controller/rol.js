const express = require('express');
const router = express.Router();


const pool = require('../database');

const postRol = async (req, res) => {
    const nuevoRol = req.body;
    console.log(nuevoRol);
    await pool.query('INSERT INTO rol set ?', [nuevoRol]);
    res.json({"message":"Registro Agregado  correctamente"})
  
}

const getRol = async (req, res) => {
    const verRol = await pool.query('SELECT * FROM rol');
    return res.json(verRol);
}

const getIdRol = async (req, res) => {
    const {id} = req.params;
    const listarRol = await pool.query('SELECT * FROM rol WHERE ROL_ID = ?',[id]);
    console.log(listarRol[0]);
    return res.json(listarRol[0])
}

const getCedulaRol = async (req, res) => {
    const {cedula} = req.params;
    const listarRol = await pool.query('SELECT * FROM rol WHERE ROL_CEDULA = ?',[cedula]);
    console.log(listarRol[0]);
    return res.json(listarRol[0])
}

const deleteRol = async (req, res) => {
    const {id} = req.params;
     await pool.query('DELETE FROM rol WHERE ROL_ID = ?',[id]);
    res.json({"message":"Registro Eliminado  correctamente"})
}

const getEditRol = async (req, res) => {
    const {id} = req.params;
    const editarRol = await pool.query('SELECT * FROM rol WHERE ROL_ID = ?',[id]);
    console.log(editarRol[0]);
    return res.json(editarRol[0])
}

const putRol =   async (req, res) => {
    const {id} = req.params;
    const editarRol = req.body;
    await pool.query('UPDATE rol set ? WHERE ROL_ID = ?', [editarRol,id]);
    res.json({"message":"Registro Agregado  correctamente"})

}

module.exports = { postRol, getRol, getIdRol, getCedulaRol, deleteRol,getEditRol, putRol}