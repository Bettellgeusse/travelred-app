const express = require('express');
const router = express.Router();
const pool = require('../database');

//Agregar
const postCliente = async (req, res) => {
    try {
        const nuevoGrupo =  {
            "CLN_ID":0, 
            "GRP_VALORTOTAL": null,
            "GRP_VALORSALDO": null,
            "GRP_OBSERVACION": null,
          }
        console.log(nuevoGrupo);
        var result = await pool.query('INSERT INTO grupo set ?', [nuevoGrupo]);
        resulgrupo = result.insertId;
        console.log("id de grupo"+resulgrupo)
        console.log("grupo ingresado");
        const num = await pool.query('SELECT GRP_ID FROM grupo WHERE GRP_ID=(SELECT MAX(GRP_ID) FROM grupo)');
        console.log("numero grupo: "+num[0].GRP_ID);
        var num_grupo = num[0].GRP_ID;


    } catch (error) {//controlar error
        res.json({"message_error":500,
        "description":"Error en query Agregar Grupos",
        "Error":error })
    }
    try {
        const nuevoUsuario = req.body;
        console.log("JSON Recibido");
        console.log(nuevoUsuario.hola.length);              
        for(i=0;i<nuevoUsuario.hola.length;i++){
            
            
           nuevoUsuario.hola[i].grp_id=num_grupo;
           console.log(nuevoUsuario.hola[i]);
           var result = await pool.query('INSERT INTO cliente set ?', [nuevoUsuario.hola[i]]);
           console.log("Usuario ingresado");
           console.log(result) ;
           var id= new Array();
           
           if(i===0){
             var primerCliente = result.insertId;
           }
           
           console.log(i);
           console.log("id que necesito :"+primerCliente)
        }
        res.json({"message":"Registro Agregado  correctamente",
                  "id_cli":primerCliente,
                  "id_gru":resulgrupo})
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
//Listar por id Grupo
const getIdCliente = async (req, res) => {
    try {
        const {id} = req.params;
        const listarcliente = await pool.query('SELECT * FROM cliente WHERE CLN_ID = ?',[id]);
        console.log(listarcliente);
        return res.json(listarcliente)
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query listar id Grupo (GRP_ID)",
        "Error":error })
    }
}
//Listar por id Grupo
const getIdGrupo = async (req, res) => {
    try {
        const {id} = req.params;
        const listarcliente = await pool.query('SELECT * FROM cliente WHERE GRP_ID = ?',[id]);
        console.log(listarcliente);
        return res.json(listarcliente)
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query listar id Grupo (GRP_ID)",
        "Error":error })
    }
}
//Listar por id
// const getIdCliente = async (req, res) => {
//     try {
//         const {id} = req.params;
//         const listarcliente = await pool.query('SELECT * FROM cliente WHERE CLN_ID = ?',[id]);
//         console.log(listarcliente[0]);
//         return res.json(listarcliente[0])
//     } catch (error) {
//         res.json({"message_error":500,
//         "description":"Error en query listar id Cliente",
//         "Error":error })
//     }
// }
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

module.exports = { postCliente, getCliente, getIdCliente,getIdGrupo, getCedulaCLiente, deleteCliente,getEditCliente, putCliente}