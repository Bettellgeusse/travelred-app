const express = require('express');
const router = express.Router();


const pool = require('../database');

const postAhorro = async (req, res) => {
    // const {aho_acom, aho_extra, aho_abono1, aho_abono2, aho_abono3, aho_fecha_abono1, aho_fecha_abono2, aho_fecha_abono3 } = req.body;
    // const nuevoAhorro ={
    //     aho_acom, 
    //     aho_extra, 
    //     aho_abono1, 
    //     aho_abono2, 
    //     aho_abono3, 
    //     aho_fecha_abono1, 
    //     aho_fecha_abono2, 
    //     aho_fecha_abono3 
    // };
    const nuevoAhorro = req.body;
    console.log(nuevoAhorro);
    await pool.query('INSERT INTO ahorro set ?', [nuevoAhorro]);
    res.json({"message":"Registro Agregado  correctamente"})
    //req.flash('success','Ahorro Agregado Correctamente');
    //res.redirect('/ahorro/lista_ahorros');
}


const getAhorro = async (req, res) => {
    const verahorro = await pool.query('SELECT a.AHO_ID ,a.AHO_ACOM,a.AHO_EXTRA,a.AHO_ABONO1,a.AHO_ABONO2,a.AHO_ABONO3,a.AHO_FECHA_ABONO1,a.AHO_FECHA_ABONO2,a.AHO_FECHA_ABONO3,a.AHO_CUEN_ABONO1, a.AHO_CUEN_ABONO2, a.AHO_CUEN_ABONO3, a.AHO_OBSERVACIONES,cue.CTA_NOMBRE AS CTA_NOMBRE1,cue2.CTA_NOMBRE AS CTA_NOMBRE2,cue3.CTA_NOMBRE AS CTA_NOMBRE3,c.CLN_ID, c.CLN_NOMBRE,c.CLN_CEDULA,c.CLN_CELULAR,t.TOU_ID,t.TOU_NOMBRE,t.TOU_FECHA FROM ahorro AS a INNER JOIN cliente AS c ON a.CLN_ID = c.CLN_ID INNER JOIN tour AS t ON a.TOU_ID = t.TOU_ID INNER JOIN cuentas AS cue ON AHO_CUEN_ABONO1 = cue.CTA_ID INNER JOIN cuentas AS cue2 ON a.AHO_CUEN_ABONO2 = cue2.CTA_ID INNER JOIN cuentas AS cue3 ON a.AHO_CUEN_ABONO3 = cue3.CTA_ID;');
    //res.render('ahorro/lista_ahorros', {verahorro:verahorro});
    console.log(verahorro)
     res.json(verahorro);
}

const getIdAhorro = async (req, res) => {
    const {id} = req.params;
    const listarAhorro = await pool.query('SELECT a.AHO_ID ,a.AHO_ACOM,a.AHO_EXTRA,a.AHO_ABONO1,a.AHO_ABONO2,a.AHO_ABONO3,a.AHO_FECHA_ABONO1,a.AHO_FECHA_ABONO2,a.AHO_FECHA_ABONO3,a.AHO_CUEN_ABONO1, a.AHO_CUEN_ABONO2, a.AHO_CUEN_ABONO3, a.AHO_OBSERVACIONES,cue.CTA_NOMBRE AS CTA_NOMBRE1,cue2.CTA_NOMBRE AS CTA_NOMBRE2,cue3.CTA_NOMBRE AS CTA_NOMBRE3,c.CLN_ID,c.CLN_NOMBRE,c.CLN_CEDULA,c.CLN_CELULAR,t.TOU_ID,t.TOU_NOMBRE,t.TOU_FECHA FROM ahorro AS a INNER JOIN cliente AS c ON a.CLN_ID = c.CLN_ID INNER JOIN tour AS t ON a.TOU_ID = t.TOU_ID INNER JOIN cuentas AS cue ON AHO_CUEN_ABONO1 = cue.CTA_ID INNER JOIN cuentas AS cue2 ON a.AHO_CUEN_ABONO2 = cue2.CTA_ID INNER JOIN cuentas AS cue3 ON a.AHO_CUEN_ABONO3 = cue3.CTA_ID WHERE AHO_ID = ?',[id]);
    return res.json(listarAhorro[0])
}

const deleteAhorro = async (req, res) => {
    try {
        const {id} = req.params;
        await pool.query('DELETE FROM ahorro WHERE AHO_ID = ?',[id]);
        //req.flash('success','Ahorro Eliminado Correctamente');
        //res.redirect('/ahorro/lista_ahorros');
        res.json({"message":"Registro Eliminado  correctamente"})
    } catch (error) {
        res.json({"message":"Error",
                  "Error":error })
    }

}

const getEditAhorro =  async (req, res) => {
    const {id} = req.params;
    const editarAhorro = await pool.query('SELECT * FROM ahorro WHERE AHO_ID = ?',[id]);
    res.render('ahorro/editar_ahorro',{editarAhorro:editarAhorro[0]} );
    
}

const putahorro = async (req, res) => {
    const {id} = req.params;
/*     const {aho_acom, aho_extra, aho_abono1, aho_abono2, aho_abono3, aho_fecha_abono1, aho_fecha_abono2, aho_fecha_abono3 } = req.body;
    const editarAhorro ={
        aho_acom, 
        aho_extra, 
        aho_abono1, 
        aho_abono2, 
        aho_abono3, 
        aho_fecha_abono1, 
        aho_fecha_abono2, 
        aho_fecha_abono3 
    }; */
     const editarAhorro = req.body;
    await pool.query('UPDATE ahorro set ? WHERE AHO_ID = ?', [editarAhorro,id]);
    res.json({"message":"Registro Agregado  correctamente"})
    //req.flash('success','Ahorro Actualizado Correctamente');
    //res.redirect('/ahorro/lista_ahorros');
}

module.exports = { postAhorro, getAhorro, deleteAhorro, getEditAhorro, putahorro, getIdAhorro}