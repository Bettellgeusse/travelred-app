const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { validategrupos } = require('../validators/grupos');
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add_grupo',(req, res) => {
       res.render('grupos/add_grupo');
});

router.post('/add_grupo', validategrupos, async (req, res) => {
    const {grp_valortotal, grp_valorsaldo, grp_observacion } = req.body;
    const nuevoGrupo ={
        grp_valortotal, 
        grp_valorsaldo, 
        grp_observacion
    };
    //const nuevoUsuario = req.body;
    console.log(nuevoGrupo);
    await pool.query('INSERT INTO grupo set ?', [nuevoGrupo]);
    //res.json({"message":"Registro Agregado  correctamente"})
    req.flash('success','Grupo Agregado Correctamente');
    res.redirect('/grupos/listar_grupos');
});

    router.get('/listar_grupos',  async (req, res) => {
        const vergrupos = await pool.query('SELECT * FROM grupo');
        //res.render('grupos/listar_grupos', {vergrupos:vergrupos});
        return res.json(vergrupos);
    });

    router.get('/eliminar_grupo/:id', async (req, res) => {
        const {id} = req.params;
         await pool.query('DELETE FROM grupo WHERE GRP_ID  = ?',[id]);
        req.flash('success','Grupo Eliminao Correctamente');
        res.redirect('/grupos/listar_grupos');
        //res.json({"message":"Registro Eliminado  correctamente"})
    });

    router.get('/editar_grupo/:id',  async (req, res) => {
        const {id} = req.params;
        const editarGrupo = await pool.query('SELECT * FROM grupo WHERE GRP_ID = ?',[id]);
        res.render('grupos/editar_grupo',{editarGrupo:editarGrupo[0]} );
        
    });

    router.post('/editar_grupo/:id',  async (req, res) => {
        const {id} = req.params;
        const {grp_valortotal, grp_valorsaldo, grp_observacion } = req.body;
        const nuevoGrupo ={
            grp_valortotal, 
            grp_valorsaldo, 
            grp_observacion
        };
        // const editarUsuario = req.body;
        await pool.query('UPDATE grupo set ? WHERE GRP_ID = ?', [nuevoGrupo,id]);
        //res.json({"message":"Registro Agregado  correctamente"})
        req.flash('success','Grupo Actualizado Correctamente');
        res.redirect('/grupos/listar_grupos');
    });


module.exports = router;