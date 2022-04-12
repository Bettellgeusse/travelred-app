const express = require('express');
const router = express.Router();


const pool = require('../database');

const postCliente = async (req, res) => {
    // const {cln_nombre, cln_apellido, cln_edad, cln_celular, cln_correo, cln_fechanac, cln_cedula, cln_observaciones } = req.body;
    // const nuevoUsuario ={
    //     cln_nombre, 
    //     cln_apellido, 
    //     cln_edad, 
    //     cln_celular, 
    //     cln_correo, 
    //     cln_fechanac, 
    //     cln_cedula, 
    //     cln_observaciones
    // };
    const nuevoUsuario = req.body;
    console.log(nuevoUsuario);
    await pool.query('INSERT INTO cliente set ?', [nuevoUsuario]);
    res.json({"message":"Registro Agregado  correctamente"})
    //req.flash('success','Cliente Agregado Correctamente');
    //res.redirect('/clientes/lista_clientes');
  
}

const getCliente = async (req, res) => {
    const vercliente = await pool.query('SELECT * FROM cliente');
    //res.render('clientes/lista_clientes', {vercliente:vercliente});
    return res.json(vercliente);
}

const getIdCliente = async (req, res) => {
    const {id} = req.params;
    const listarcliente = await pool.query('SELECT * FROM cliente WHERE CLN_ID = ?',[id]);
    console.log(listarcliente[0]);
    return res.json(listarcliente[0])
   // res.render('clientes/editar_cliente',{editarcliente:editarcliente[0]} );
}

const getCedulaCLiente = async (req, res) => {
    const {cedula} = req.params;
    const listarcliente = await pool.query('SELECT * FROM cliente WHERE CLN_CEDULA = ?',[cedula]);
    console.log(listarcliente[0]);
    return res.json(listarcliente[0])
   // res.render('clientes/editar_cliente',{editarcliente:editarcliente[0]} );
}

const deleteCliente = async (req, res) => {
    const {id} = req.params;
     await pool.query('DELETE FROM cliente WHERE CLN_ID = ?',[id]);
    // req.flash('success','Cliente Eliminado Correctamente');
    // res.redirect('/clientes/lista_clientes');
    res.json({"message":"Registro Eliminado  correctamente"})
}

const getEditCliente = async (req, res) => {
    const {id} = req.params;
    const editarcliente = await pool.query('SELECT * FROM cliente WHERE CLN_ID = ?',[id]);
    console.log(editarcliente[0]);
    return res.json(editarcliente[0])
   // res.render('clientes/editar_cliente',{editarcliente:editarcliente[0]} );
}

const putCliente =   async (req, res) => {
    const {id} = req.params;
    // const {cln_nombre, cln_apellido, cln_edad, cln_celular, cln_correo, cln_fechanac, cln_cedula, cln_observaciones } = req.body;
    // const editarUsuario ={
    //     cln_nombre, 
    //     cln_apellido, 
    //     cln_edad, 
    //     cln_celular, 
    //     cln_correo, 
    //     cln_fechanac, 
    //     cln_cedula, 
    //     cln_observaciones
    // };
    const editarUsuario = req.body;
    await pool.query('UPDATE cliente set ? WHERE CLN_ID = ?', [editarUsuario,id]);
    res.json({"message":"Registro Agregado  correctamente"})
    // req.flash('success','Cliente Actualizado Correctamente');
    // res.redirect('/clientes/lista_clientes');
}

module.exports = { postCliente, getCliente, getIdCliente, getCedulaCLiente, deleteCliente,getEditCliente, putCliente}