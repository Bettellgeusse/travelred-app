const express = require('express');
const router = express.Router();
const pool = require('../database');

// //Agregar prueba caja menor
// const postReservas = async (req, res) => {
//     try {
//         const nuevaReserva = req.body;

//         if(nuevaReserva.CTA_NOMBRE1 == "Caja Menor"){
//         const Cajamenor = {"CJA_BENEFICIARIO" : nuevaReserva.CLN_NOMBRE,
//                            "CJA_CONCEPTO" : nuevaReserva.TOU_NOMBRE,
//                            "CJA_FECHA" : nuevaReserva.RES_FECHA_ABONO1,
//                            "CJA_INGRESO" : nuevaReserva.valor_caja_menor,
//                            "CTA_NOMBRE1" : nuevaReserva.CTA_NOMBRE1  }; 

//         console.log("campos enviados json");                                                   
//         console.log(nuevaReserva);
//         delete nuevaReserva.valor_caja_menor, delete nuevaReserva.CLN_NOMBRE, delete nuevaReserva.TOU_NOMBRE, delete nuevaReserva.CTA_NOMBRE1;
//         console.log("campos borrados");  
//         console.log(nuevaReserva);
//         console.log("Nuevo objeto cajamenor ");  
//         console.log(Cajamenor);
//         await pool.query('INSERT INTO reserva set ?', [nuevaReserva]);
//         console.log(nuevaReserva);
//         const CajaMenor2 = await pool.query('SELECT CJA_SALDO FROM cajamenor WHERE CJA_ID=(SELECT MAX(CJA_ID) FROM cajamenor)');
//         console.log(CajaMenor2[0]);
//         console.log(Cajamenor);
//         Cajamenor.CJA_SALDO_ANTERIOR = CajaMenor2[0].CJA_SALDO;
//         console.log(Cajamenor);

        
//             Cajamenor.CJA_SALDO = Cajamenor.CJA_SALDO_ANTERIOR+Cajamenor.CJA_INGRESO;
//             delete Cajamenor.CTA_NOMBRE1, delete Cajamenor.CJA_SALDO_ANTERIOR;
//             await pool.query('INSERT INTO cajamenor set ?', [Cajamenor]);
//         }

//         await pool.query('INSERT INTO reserva set ?', [nuevaReserva]);
//         res.json({"message":"Registro Agregado  correctamente"})
//     } catch (error) {
//         res.json({"message_error":500,
//         "description":"Error en query Agregar Reservas",
//         "Error":error })
//     }
// }

//Agregar
const postReservas = async (req, res) => {
    try {
        const nuevaReserva = req.body;
        console.log(nuevaReserva);
        await pool.query('INSERT INTO reserva set ?', [nuevaReserva]);
        res.json({"message":"Registro Agregado  correctamente"})
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query Agregar Reservas",
        "Error":error })
    }
}
//Listar
const getReservas = async (req, res) => {
    try {
        const verReserva = await pool.query('SELECT r.RES_ID, r.GRP_ID, (SELECT CLN_NOMBRE FROM cliente WHERE CLN_ID = g.CLN_ID ) AS LIDER, g.CLN_ID AS LIDER_G, g.GRP_VALORTOTAL, g.GRP_VALORSALDO,r.RES_ACOM,r.RES_ACOM_CUENT,cueacom.CTA_NOMBRE AS CTA_NOMBRE_ACOM,r.RES_EXTRA,r.RES_EXTRA_CUENT,cuextra.CTA_NOMBRE AS CTA_NOMBRE_EXTRA,r.RES_ABONO1,r.RES_ABONO2,r.RES_ABONO3,r.RES_OBSERVACIONES,r.RES_FECHA_ABONO1,r.RES_FECHA_ABONO2,r.RES_FECHA_ABONO3, r.RES_FECHA_ABONO4,r.RES_FECHA_ABONO5, r.RES_CUEN_ABONO1,cue.CTA_NOMBRE AS CTA_NOMBRE1,r.RES_CUEN_ABONO2,cue2.CTA_NOMBRE AS CTA_NOMBRE2,r.RES_CUEN_ABONO3,cue3.CTA_NOMBRE AS CTA_NOMBRE3,r.RES_CUEN_ABONO4,cue4.CTA_NOMBRE AS CTA_NOMBRE4,r.RES_CUEN_ABONO5,cue5.CTA_NOMBRE AS CTA_NOMBRE5,c.CLN_ID, c.CLN_NOMBRE,c.CLN_CEDULA,c.CLN_CELULAR,t.TOU_ID, t.TOU_NOMBRE,t.TOU_FECHA,t.TOU_VALORNETO, t.TOU_VALORCOMISIONABLE, t.TOU_INFANTE, t.TOU_NINO, t.TOU_ADULTO, t.TOU_ADULTO_MAYOR, t.TOU_AGENCIAS FROM reserva AS r INNER JOIN cliente AS c ON r.CLN_ID = c.CLN_ID INNER JOIN tour AS t ON r.TOU_ID = t.TOU_ID INNER JOIN cuentas AS cue ON r.RES_CUEN_ABONO1 = cue.CTA_ID INNER JOIN cuentas AS cue2 ON r.RES_CUEN_ABONO2 = cue2.CTA_ID INNER JOIN cuentas AS cue3 ON r.RES_CUEN_ABONO3 = cue3.CTA_ID INNER JOIN cuentas AS cue4 ON r.RES_CUEN_ABONO4 = cue4.CTA_ID INNER JOIN cuentas AS cue5 ON r.RES_CUEN_ABONO5 = cue5.CTA_ID INNER JOIN cuentas AS cueacom ON r.RES_ACOM_CUENT = cueacom.CTA_ID INNER JOIN cuentas AS cuextra ON r.RES_EXTRA_CUENT = cuextra.CTA_ID INNER JOIN grupo AS g ON r.GRP_ID = g.GRP_ID;');
        console.log(verReserva);
        return res.json(verReserva);
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query listar Reservas",
        "Error":error })
    }
}
//Listar por id
const getIdReservas = async (req, res) => {
    try {
        const {id} = req.params;
        const listarReserva = await pool.query('SELECT r.RES_ID, r.GRP_ID, (SELECT CLN_NOMBRE FROM cliente WHERE CLN_ID = g.CLN_ID ) AS LIDER, g.CLN_ID AS LIDER_G, g.GRP_VALORTOTAL, g.GRP_VALORSALDO,r.RES_ACOM,r.RES_ACOM_CUENT,cueacom.CTA_NOMBRE AS CTA_NOMBRE_ACOM,r.RES_EXTRA,r.RES_EXTRA_CUENT,cuextra.CTA_NOMBRE AS CTA_NOMBRE_EXTRA,r.RES_ABONO1,r.RES_ABONO2,r.RES_ABONO3,r.RES_OBSERVACIONES,r.RES_FECHA_ABONO1,r.RES_FECHA_ABONO2,r.RES_FECHA_ABONO3, r.RES_FECHA_ABONO4,r.RES_FECHA_ABONO5, r.RES_CUEN_ABONO1,cue.CTA_NOMBRE AS CTA_NOMBRE1,r.RES_CUEN_ABONO2,cue2.CTA_NOMBRE AS CTA_NOMBRE2,r.RES_CUEN_ABONO3,cue3.CTA_NOMBRE AS CTA_NOMBRE3,r.RES_CUEN_ABONO4,cue4.CTA_NOMBRE AS CTA_NOMBRE4,r.RES_CUEN_ABONO5,cue5.CTA_NOMBRE AS CTA_NOMBRE5,c.CLN_ID, c.CLN_NOMBRE,c.CLN_CEDULA,c.CLN_CELULAR,t.TOU_ID, t.TOU_NOMBRE,t.TOU_FECHA,t.TOU_VALORNETO, t.TOU_VALORCOMISIONABLE, t.TOU_INFANTE, t.TOU_NINO, t.TOU_ADULTO, t.TOU_ADULTO_MAYOR, t.TOU_AGENCIAS FROM reserva AS r INNER JOIN cliente AS c ON r.CLN_ID = c.CLN_ID INNER JOIN tour AS t ON r.TOU_ID = t.TOU_ID INNER JOIN cuentas AS cue ON r.RES_CUEN_ABONO1 = cue.CTA_ID INNER JOIN cuentas AS cue2 ON r.RES_CUEN_ABONO2 = cue2.CTA_ID INNER JOIN cuentas AS cue3 ON r.RES_CUEN_ABONO3 = cue3.CTA_ID INNER JOIN cuentas AS cue4 ON r.RES_CUEN_ABONO4 = cue4.CTA_ID INNER JOIN cuentas AS cue5 ON r.RES_CUEN_ABONO5 = cue5.CTA_ID INNER JOIN cuentas AS cueacom ON r.RES_ACOM_CUENT = cueacom.CTA_ID INNER JOIN cuentas AS cuextra ON r.RES_EXTRA_CUENT = cuextra.CTA_ID INNER JOIN grupo AS g ON r.GRP_ID = g.GRP_ID WHERE RES_ID = ?',[id]);
        console.log(listarReserva[0]);
        return res.json(listarReserva[0])
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query listar id Reservas",
        "Error":error })
    }
}
//Eliminar
const deleteReservas = async (req, res) => {
    try {
        const {id} = req.params;
        await pool.query('DELETE FROM reserva WHERE RES_ID  = ?',[id]);
        res.json({"message":"Registro Eliminado  correctamente"})
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query eliminar Reservas",
        "Error":error })
    }
}
//Editar get
const getEditReservas = async (req, res) => {
    try {
        const {id} = req.params;
        const editarReserva = await pool.query('SELECT * FROM reserva WHERE RES_ID = ?',[id]);
        res.render('reservas/editar_reserva',{editarReserva:editarReserva[0]} );    
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query editar get Reservas",
        "Error":error })
    }
}
//Editar post
const putReservas = async (req, res) => {
    try {
        const {id} = req.params;
        const nuevaReserva = req.body;
        await pool.query('UPDATE reserva set ? WHERE RES_ID = ?', [nuevaReserva,id]);
        res.json({"message":"Registro Agregado  correctamente"})
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query editar post  Reservas",
        "Error":error })
    }

}

module.exports = { postReservas, getReservas, getIdReservas, deleteReservas, getEditReservas,putReservas}