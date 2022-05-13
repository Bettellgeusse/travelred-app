const express = require('express');
const router = express.Router();


const pool = require('../database');

const poolGrupos = async (req, res) => {
    try {
        const nuevoGrupo = req.body;
        console.log(nuevoGrupo);
        await pool.query('INSERT INTO grupo set ?', [nuevoGrupo]);
        res.json({"message":"Registro Agregado  correctamente"})
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query Agregar Grupos",
        "Error":error })
    }
}

const getGrupos = async (req, res) => {
    try {
        const vergrupos = await pool.query('SELECT g.GRP_ID,g.GRP_VALORTOTAL,g.GRP_VALORSALDO,g.GRP_OBSERVACION,g.CLN_ID,c.CLN_NOMBRE,c.CLN_CEDULA,c.CLN_CELULAR FROM grupo AS g INNER JOIN cliente AS c ON g.CLN_ID = c.CLN_ID;');
        return res.json(vergrupos);
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query listar Grupos",
        "Error":error })
    }
}

const getIdGrupos = async (req, res) => {
    try {
        const {id} = req.params;
        const listarGrupos = await pool.query('SELECT g.GRP_ID,g.GRP_VALORTOTAL,g.GRP_VALORSALDO,g.GRP_OBSERVACION,g.CLN_ID,c.CLN_NOMBRE,c.CLN_CEDULA,c.CLN_CELULAR FROM grupo AS g INNER JOIN cliente AS c ON g.CLN_ID = c.CLN_ID WHERE g.GRP_ID = ?',[id]);
        console.log(listarGrupos[0]);
        return res.json(listarGrupos[0])
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query listar id Grupos",
        "Error":error })
    }
}

const deleteGrupos = async (req, res) => {
    try {
        const {id} = req.params;
        await pool.query('DELETE FROM grupo WHERE GRP_ID  = ?',[id]);
        res.json({"message":"Registro Eliminado  correctamente"})
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query eliminar Grupos",
        "Error":error })
    }
}

const getEditGrupos = async (req, res) => {
    try {
        const {id} = req.params;
        const editarGrupo = await pool.query('SELECT * FROM grupo WHERE GRP_ID = ?',[id]);
        res.render('grupos/editar_grupo',{editarGrupo:editarGrupo[0]} );
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query editar get Grupos",
        "Error":error })
    }
}

const putGrupos = async (req, res) => {
    try {
        const {id} = req.params;
        const nuevoGrupo = req.body;
        await pool.query('UPDATE grupo set ? WHERE GRP_ID = ?', [nuevoGrupo,id]);
        res.json({"message":"Registro Agregado  correctamente"})
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query editar post Grupos",
        "Error":error })
    }
}

module.exports = { poolGrupos, getGrupos, getIdGrupos, deleteGrupos, getEditGrupos,putGrupos}