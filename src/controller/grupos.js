const express = require('express');
const router = express.Router();


const pool = require('../database');

const poolGrupos = async (req, res) => {
    // const {grp_valortotal, grp_valorsaldo, grp_observacion } = req.body;
    // const nuevoGrupo ={
    //     grp_valortotal, 
    //     grp_valorsaldo, 
    //     grp_observacion
    // };
    const nuevoGrupo = req.body;
    console.log(nuevoGrupo);
    await pool.query('INSERT INTO grupo set ?', [nuevoGrupo]);
    res.json({"message":"Registro Agregado  correctamente"})
    //req.flash('success','Grupo Agregado Correctamente');
    //res.redirect('/grupos/listar_grupos');
}

const getGrupos = async (req, res) => {
    const vergrupos = await pool.query('SELECT g.GRP_ID,g.GRP_VALORTOTAL,g.GRP_VALORSALDO,g.GRP_OBSERVACION,g.CLN_ID,c.CLN_NOMBRE,c.CLN_CEDULA,c.CLN_CELULAR FROM grupo AS g INNER JOIN cliente AS c ON g.CLN_ID = c.CLN_ID;');
    //res.render('grupos/listar_grupos', {vergrupos:vergrupos});
    return res.json(vergrupos);
}

const getIdGrupos = async (req, res) => {
    const {id} = req.params;
    const listarGrupos = await pool.query('SELECT g.GRP_ID,g.GRP_VALORTOTAL,g.GRP_VALORSALDO,g.GRP_OBSERVACION,g.CLN_ID,c.CLN_NOMBRE,c.CLN_CEDULA,c.CLN_CELULAR FROM grupo AS g INNER JOIN cliente AS c ON g.CLN_ID = c.CLN_ID WHERE GRP_ID = ?',[id]);
    console.log(listarGrupos[0]);
    return res.json(listarGrupos[0])
}

const deleteGrupos = async (req, res) => {
    const {id} = req.params;
     await pool.query('DELETE FROM grupo WHERE GRP_ID  = ?',[id]);
    //req.flash('success','Grupo Eliminao Correctamente');
    //res.redirect('/grupos/listar_grupos');
    res.json({"message":"Registro Eliminado  correctamente"})
}

const getEditGrupos = async (req, res) => {
    const {id} = req.params;
    const editarGrupo = await pool.query('SELECT * FROM grupo WHERE GRP_ID = ?',[id]);
    res.render('grupos/editar_grupo',{editarGrupo:editarGrupo[0]} );
    
}

const putGrupos = async (req, res) => {
    const {id} = req.params;
    // const {grp_valortotal, grp_valorsaldo, grp_observacion } = req.body;
    // const nuevoGrupo ={
    //     grp_valortotal, 
    //     grp_valorsaldo, 
    //     grp_observacion
    // };
    const nuevoGrupo = req.body;
    await pool.query('UPDATE grupo set ? WHERE GRP_ID = ?', [nuevoGrupo,id]);
    res.json({"message":"Registro Agregado  correctamente"})
    //req.flash('success','Grupo Actualizado Correctamente');
    //res.redirect('/grupos/listar_grupos');
}

module.exports = { poolGrupos, getGrupos, getIdGrupos, deleteGrupos, getEditGrupos,putGrupos}