const express = require('express');
const router = express.Router();
const pool = require('../database');

//Agregar
const postTours =  async (req, res) => {
    try {
        const nuevoTour = req.body;
        console.log(nuevoTour);
        await pool.query('INSERT INTO tour set ?', [nuevoTour]);
        res.json({"message":"Registro Agregado  correctamente"})
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query Agregar Tour",
        "Error":error })
    }

}
//Listar
const getTours = async (req, res) => {
    try {
        const vertours = await pool.query('SELECT * FROM tour');
        return res.json(vertours);
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query listar Tour",
        "Error":error })
    }

}
//Listar por id
const getIdTours = async (req, res) => {
    try {
        const {id} = req.params;
        const listarTours = await pool.query('SELECT * FROM tour WHERE TOU_ID = ?',[id]);
        console.log(listarTours[0]);
        return res.json(listarTours[0])
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query listar id Tour",
        "Error":error })
    }

}
//Eliminar
const deleteours = async (req, res) => {
    try {
        const {id} = req.params;
        await pool.query('DELETE FROM tour WHERE TOU_ID  = ?',[id]);
        res.json({"message":"Registro Eliminado  correctamente"})
    } catch (error) {
        res.json({"message_error":500,
                  "description":"Error en query delete Tour",
                  "Error":error })

    }
}
//Editar get
const getEditTours = async (req, res) => {
    try {
        const {id} = req.params;
        const editarTour = await pool.query('SELECT * FROM tour WHERE TOU_ID = ?',[id]);
        res.render('tours/editar_tour',{editarTour:editarTour[0]} );
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query editar Tour",
        "Error":error })
    }
    
}
//Editar post
const putTours = async (req, res) => {
    try {
        const {id} = req.params;
        const nuevoTour = req.body;
        await pool.query('UPDATE tour set ? WHERE TOU_ID = ?', [nuevoTour,id]);
        res.json({"message":"Registro Agregado  correctamente"})
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query editar Tour",
        "Error":error })
    }

}

module.exports = { postTours, getTours, getIdTours, deleteours, getEditTours,putTours}