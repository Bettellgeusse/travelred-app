const express = require('express');
const { body, validationResult } = require('express-validator');
const { validateCliente } = require('../validators/clientes.js')
const router = express.Router();


const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add',isLoggedIn, (req, res) => {
       res.render('links/add');
});

router.post('/add', validateCliente ,async (req, res) => {
    const {cln_nombre, cln_apellido, cln_edad, cln_celular, cln_correo, cln_fechanac, cln_cedula, cln_observaciones } = req.body;
    const nuevoUsuario ={
        cln_nombre, 
        cln_apellido, 
        cln_edad, 
        cln_celular, 
        cln_correo, 
        cln_fechanac, 
        cln_cedula, 
        cln_observaciones
    };
    //const nuevoUsuario = req.body;
    console.log(nuevoUsuario);
    await pool.query('INSERT INTO cliente set ?', [nuevoUsuario]);
    //res.json({"message":"Registro Agregado  correctamente"})
    req.flash('success','Cliente Agregado Correctamente');
    res.redirect('/links/lista_clientes');
  
});

    router.get('/lista_clientes',  async (req, res) => {
        const vercliente = await pool.query('SELECT * FROM cliente');
        //res.render('links/lista_clientes', {vercliente:vercliente});
        return res.json(vercliente);
    });

    router.get('/eliminar_cliente/:id', isLoggedIn,async (req, res) => {
        const {id} = req.params;
         await pool.query('DELETE FROM cliente WHERE CLN_ID = ?',[id]);
        req.flash('success','Cliente Eliminado Correctamente');
        res.redirect('/links/lista_clientes');
        //res.json({"message":"Registro Eliminado  correctamente"})
    });

    router.get('/editar_cliente/:id', isLoggedIn, async (req, res) => {
        const {id} = req.params;
        const editarcliente = await pool.query('SELECT * FROM cliente WHERE CLN_ID = ?',[id]);
        res.render('links/editar_cliente',{editarcliente:editarcliente[0]} );
        
    });

    router.post('/editar_cliente/:id',  async (req, res) => {
        const {id} = req.params;
        const {cln_nombre, cln_apellido, cln_edad, cln_celular, cln_correo, cln_fechanac, cln_cedula, cln_observaciones } = req.body;
        const editarUsuario ={
            cln_nombre, 
            cln_apellido, 
            cln_edad, 
            cln_celular, 
            cln_correo, 
            cln_fechanac, 
            cln_cedula, 
            cln_observaciones
        };
        // const editarUsuario = req.body;
        await pool.query('UPDATE cliente set ? WHERE CLN_ID = ?', [editarUsuario,id]);
        //res.json({"message":"Registro Agregado  correctamente"})
        req.flash('success','Cliente Actualizado Correctamente');
        res.redirect('/links/lista_clientes');
    });


module.exports = router;