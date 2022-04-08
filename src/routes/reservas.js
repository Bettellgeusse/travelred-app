const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { validatereservas } = require('../validators/reservas');
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add_reserva',(req, res) => {
       res.render('reservas/add_reserva');
});

router.post('/add_reserva',validatereservas, async (req, res) => {
    const {res_acom, res_extra, res_abono1, res_abono2,res_abono3,res_observaciones,res_fecha_abono1,res_fecha_abono2,res_fecha_abono3 } = req.body;
    const nuevaReserva ={
        res_acom, 
        res_extra, 
        res_abono1, 
        res_abono2,
        res_abono3,
        res_observaciones,
        res_fecha_abono1,
        res_fecha_abono2,
        res_fecha_abono3
    };
    //const nuevoUsuario = req.body;
    console.log(nuevaReserva);
    await pool.query('INSERT INTO reserva set ?', [nuevaReserva]);
    //res.json({"message":"Registro Agregado  correctamente"})
    req.flash('success','Reserva Agregada Correctamente');
    res.redirect('/reservas/listar_reservas');
});

    router.get('/listar_reservas',  async (req, res) => {
        const verReserva = await pool.query('SELECT * FROM reserva');
        //res.render('reservas/listar_reservas', {verReserva:verReserva});
        return res.json(verReserva);
    });

    router.get('/eliminar_reserva/:id', async (req, res) => {
        const {id} = req.params;
         await pool.query('DELETE FROM reserva WHERE RES_ID  = ?',[id]);
        req.flash('success','Reserva Eliminada Correctamente');
        res.redirect('/reservas/listar_reservas');
        //res.json({"message":"Registro Eliminado  correctamente"})
    });

    router.get('/editar_reserva/:id',  async (req, res) => {
        const {id} = req.params;
        const editarReserva = await pool.query('SELECT * FROM reserva WHERE RES_ID = ?',[id]);
        res.render('reservas/editar_reserva',{editarReserva:editarReserva[0]} );
        
    });

    router.post('/editar_reserva/:id',  async (req, res) => {
        const {id} = req.params;
        const {res_acom, res_extra, res_abono1, res_abono2,res_abono3,res_observaciones,res_fecha_abono1,res_fecha_abono2,res_fecha_abono3 } = req.body;
        const nuevaReserva ={
            res_acom, 
            res_extra, 
            res_abono1, 
            res_abono2,
            res_abono3,
            res_observaciones,
            res_fecha_abono1,
            res_fecha_abono2,
            res_fecha_abono3
        };
        // const editarUsuario = req.body;
        await pool.query('UPDATE reserva set ? WHERE RES_ID = ?', [nuevaReserva,id]);
        //res.json({"message":"Registro Agregado  correctamente"})
        req.flash('success','Reserva Actualizada Correctamente');
        res.redirect('/reservas/listar_reservas');
    });


module.exports = router;