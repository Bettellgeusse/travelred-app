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
        console.log("JSON Recibido");
        console.log(nuevaReserva.reserva.length);
       // console.log(nuevaReserva);

        for(i=0;i<nuevaReserva.reserva.length;i++){
            console.log(nuevaReserva.reserva[i]);
            nuevaReserva.reserva[i].RES_VALOR_TOTAL = (nuevaReserva.reserva[i].RES_EXTRA+nuevaReserva.reserva[i].RES_ACOM+nuevaReserva.reserva[i].RES_VALOR_UNITARIO)   
            console.log(nuevaReserva.reserva[i]);
            await pool.query('INSERT INTO reserva set ?', [nuevaReserva.reserva[i]]);
            console.log("Reserva registrada");
           }
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
        const verReserva = await pool.query('SELECT r.RES_ID, r.GRP_ID, r.RES_CATEGORIA, (SELECT CLN_NOMBRE FROM cliente WHERE CLN_ID = g.CLN_ID ) AS LIDER,(SELECT ROL_NOMBRE FROM rol WHERE ROL_ID = r.ROL_ID ) AS USUARIO_ROL, g.CLN_ID AS LIDER_G, g.GRP_VALORTOTAL, g.GRP_VALORSALDO,r.RES_FACTURA_1,r.RES_FACTURA_2,r.RES_FACTURA_3,r.RES_FACTURA_4,r.RES_FACTURA_5,r.RES_FACTURA_6,r.RES_VALOR_UNITARIO,r.RES_VALOR_TOTAL,  r.RES_ACOM,r.RES_ACOM_CUENT,cueacom.CTA_NOMBRE AS CTA_NOMBRE_ACOM,r.RES_EXTRA,r.RES_EXTRA_CUENT,cuextra.CTA_NOMBRE AS CTA_NOMBRE_EXTRA,r.RES_ABONO1,r.RES_ABONO2,r.RES_ABONO3,r.RES_ABONO4,r.RES_ABONO5,r.RES_ABONO6, r.RES_OBSERVACIONES,r.RES_OBSERVACIONES_FACTURA, r.RES_FECHA_ABONO1,r.RES_FECHA_ABONO2,r.RES_FECHA_ABONO3, r.RES_FECHA_ABONO4,r.RES_FECHA_ABONO5,r.RES_FECHA_ABONO6,  r.RES_CUEN_ABONO1,cue.CTA_NOMBRE AS CTA_NOMBRE1,r.RES_CUEN_ABONO2,cue2.CTA_NOMBRE AS CTA_NOMBRE2,r.RES_CUEN_ABONO3,cue3.CTA_NOMBRE AS CTA_NOMBRE3,r.RES_CUEN_ABONO4,cue4.CTA_NOMBRE AS CTA_NOMBRE4,r.RES_CUEN_ABONO5,cue5.CTA_NOMBRE AS CTA_NOMBRE5,r.RES_CUEN_ABONO6,cue6.CTA_NOMBRE AS CTA_NOMBRE6,c.CLN_ID, c.CLN_NOMBRE,c.CLN_CEDULA,c.CLN_CELULAR,c.CLN_DIRECCION,t.TOU_ID, t.TOU_NOMBRE,t.TOU_FECHA,t.TOU_VALORNETO, t.TOU_VALORCOMISIONABLE, t.TOU_INFANTE, t.TOU_NINO, t.TOU_ADULTO, t.TOU_ADULTO_MAYOR, t.TOU_AGENCIAS, t.TOU_CODIGO_AEROLINEA,t.TOU_VUELO_SALIDA,t.TOU_HORA_SALIDA,t.TOU_VUELO_REGRESO,t.TOU_HORA_REGRESO FROM reserva AS r INNER JOIN cliente AS c ON r.CLN_ID = c.CLN_ID INNER JOIN tour AS t ON r.TOU_ID = t.TOU_ID INNER JOIN cuentas AS cue ON r.RES_CUEN_ABONO1 = cue.CTA_ID INNER JOIN cuentas AS cue2 ON r.RES_CUEN_ABONO2 = cue2.CTA_ID INNER JOIN cuentas AS cue3 ON r.RES_CUEN_ABONO3 = cue3.CTA_ID INNER JOIN cuentas AS cue4 ON r.RES_CUEN_ABONO4 = cue4.CTA_ID INNER JOIN cuentas AS cue5 ON r.RES_CUEN_ABONO5 = cue5.CTA_ID INNER JOIN cuentas AS cue6 ON r.RES_CUEN_ABONO6 = cue6.CTA_ID INNER JOIN cuentas AS cueacom ON r.RES_ACOM_CUENT = cueacom.CTA_ID INNER JOIN cuentas AS cuextra ON r.RES_EXTRA_CUENT = cuextra.CTA_ID INNER JOIN grupo AS g ON r.GRP_ID = g.GRP_ID;');
        
        
        const TOTAL = 0;
        const TOTAL_GRUPAL = 0;
        const SALDO =0;
        const test = verReserva.map(verReserva => {
            // spread operator ( ... )
        return {...verReserva,TOTAL,TOTAL_GRUPAL,SALDO };
         });      
         
         for (i=0; i<verReserva.length; i++){
            console.log("valor acomodacion: "+verReserva[i].RES_ACOM)
            console.log("valor extra: "+verReserva[i].RES_EXTRA)
            console.log("valor unitario: "+verReserva[i].RES_VALOR_UNITARIO)
            test[i].TOTAL = (verReserva[i].RES_EXTRA+verReserva[i].RES_ACOM+verReserva[i].RES_VALOR_UNITARIO)
            console.log("TOTAL "+test[i].TOTAL)
            
            console.log("valor Abono 1 : "+verReserva[i].RES_ABONO1)
            console.log("valor Abono 2 : "+verReserva[i].RES_ABONO2)
            console.log("valor Abono 3 : "+verReserva[i].RES_ABONO3)
            console.log("valor Abono 4 : "+verReserva[i].RES_ABONO4)
            console.log("valor Abono 5 : "+verReserva[i].RES_ABONO5)
            console.log("valor Abono 6 : "+verReserva[i].RES_ABONO6)

            test[i].SALDO = (verReserva[i].RES_ABONO1+verReserva[i].RES_ABONO2+verReserva[i].RES_ABONO3+verReserva[i].RES_ABONO4+verReserva[i].RES_ABONO5+verReserva[i].RES_ABONO6)
            console.log("TOTAL "+test[i].SALDO)

            try {
                const totalgrupal = await pool.query('SELECT SUM(RES_VALOR_TOTAL) FROM reserva WHERE GRP_ID = ?',[verReserva[i].GRP_ID]);
                const arr = totalgrupal.map(elemento => Object.entries(elemento));
                console.log("resultado "+arr)
                test[i].TOTAL_GRUPAL = arr[0][0][1];
                
            } catch (error) {
                res.json({"message_error":500,
                "description":"Error en query total grupal",
                "Error":error })
            }

         }
    


            console.log(test)
            //console.log(verReserva);

        return res.json({"reservas":test});
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query listar Reservas",
        "Error":error })
    }
}
//Listar por id de reservas
const getIdReservas = async (req, res) => {
    try {
        const {id} = req.params;
        const listarReserva = await pool.query('SELECT r.RES_ID, r.GRP_ID, r.RES_CATEGORIA, (SELECT CLN_NOMBRE FROM cliente WHERE CLN_ID = g.CLN_ID ) AS LIDER,(SELECT ROL_NOMBRE FROM rol WHERE ROL_ID = r.ROL_ID ) AS USUARIO_ROL, g.CLN_ID AS LIDER_G, g.GRP_VALORTOTAL, g.GRP_VALORSALDO,r.RES_FACTURA_1,r.RES_FACTURA_2,r.RES_FACTURA_3,r.RES_FACTURA_4,r.RES_FACTURA_5,r.RES_FACTURA_6,r.RES_VALOR_UNITARIO,r.RES_VALOR_TOTAL,  r.RES_ACOM,r.RES_ACOM_CUENT,cueacom.CTA_NOMBRE AS CTA_NOMBRE_ACOM,r.RES_EXTRA,r.RES_EXTRA_CUENT,cuextra.CTA_NOMBRE AS CTA_NOMBRE_EXTRA,r.RES_ABONO1,r.RES_ABONO2,r.RES_ABONO3,r.RES_ABONO4,r.RES_ABONO5,r.RES_ABONO6, r.RES_OBSERVACIONES,r.RES_OBSERVACIONES_FACTURA, r.RES_FECHA_ABONO1,r.RES_FECHA_ABONO2,r.RES_FECHA_ABONO3, r.RES_FECHA_ABONO4,r.RES_FECHA_ABONO5,r.RES_FECHA_ABONO6,  r.RES_CUEN_ABONO1,cue.CTA_NOMBRE AS CTA_NOMBRE1,r.RES_CUEN_ABONO2,cue2.CTA_NOMBRE AS CTA_NOMBRE2,r.RES_CUEN_ABONO3,cue3.CTA_NOMBRE AS CTA_NOMBRE3,r.RES_CUEN_ABONO4,cue4.CTA_NOMBRE AS CTA_NOMBRE4,r.RES_CUEN_ABONO5,cue5.CTA_NOMBRE AS CTA_NOMBRE5,r.RES_CUEN_ABONO6,cue6.CTA_NOMBRE AS CTA_NOMBRE6,c.CLN_ID, c.CLN_NOMBRE,c.CLN_CEDULA,c.CLN_CELULAR,c.CLN_DIRECCION,t.TOU_ID, t.TOU_NOMBRE,t.TOU_FECHA,t.TOU_VALORNETO, t.TOU_VALORCOMISIONABLE, t.TOU_INFANTE, t.TOU_NINO, t.TOU_ADULTO, t.TOU_ADULTO_MAYOR, t.TOU_AGENCIAS, t.TOU_CODIGO_AEROLINEA,t.TOU_VUELO_SALIDA,t.TOU_HORA_SALIDA,t.TOU_VUELO_REGRESO,t.TOU_HORA_REGRESO FROM reserva AS r INNER JOIN cliente AS c ON r.CLN_ID = c.CLN_ID INNER JOIN tour AS t ON r.TOU_ID = t.TOU_ID INNER JOIN cuentas AS cue ON r.RES_CUEN_ABONO1 = cue.CTA_ID INNER JOIN cuentas AS cue2 ON r.RES_CUEN_ABONO2 = cue2.CTA_ID INNER JOIN cuentas AS cue3 ON r.RES_CUEN_ABONO3 = cue3.CTA_ID INNER JOIN cuentas AS cue4 ON r.RES_CUEN_ABONO4 = cue4.CTA_ID INNER JOIN cuentas AS cue5 ON r.RES_CUEN_ABONO5 = cue5.CTA_ID INNER JOIN cuentas AS cue6 ON r.RES_CUEN_ABONO6 = cue6.CTA_ID INNER JOIN cuentas AS cueacom ON r.RES_ACOM_CUENT = cueacom.CTA_ID INNER JOIN cuentas AS cuextra ON r.RES_EXTRA_CUENT = cuextra.CTA_ID INNER JOIN grupo AS g ON r.GRP_ID = g.GRP_ID where r.RES_ID =  ?',[id]);
        console.log(listarReserva);
        return res.json(listarReserva)
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query listar id Reservas",
        "Error":error })
    }
}


//Listar por id de grupo
const getIdReservasGrupo = async (req, res) => {
    try {
        const {id} = req.params;
        const listarReserva = await pool.query('SELECT r.RES_ID, r.GRP_ID, r.RES_CATEGORIA, (SELECT CLN_NOMBRE FROM cliente WHERE CLN_ID = g.CLN_ID ) AS LIDER,(SELECT ROL_NOMBRE FROM rol WHERE ROL_ID = r.ROL_ID ) AS USUARIO_ROL, g.CLN_ID AS LIDER_G, g.GRP_VALORTOTAL, g.GRP_VALORSALDO,r.RES_FACTURA_1,r.RES_FACTURA_2,r.RES_FACTURA_3,r.RES_FACTURA_4,r.RES_FACTURA_5,r.RES_FACTURA_6,r.RES_VALOR_UNITARIO,r.RES_VALOR_TOTAL,  r.RES_ACOM,r.RES_ACOM_CUENT,cueacom.CTA_NOMBRE AS CTA_NOMBRE_ACOM,r.RES_EXTRA,r.RES_EXTRA_CUENT,cuextra.CTA_NOMBRE AS CTA_NOMBRE_EXTRA,r.RES_ABONO1,r.RES_ABONO2,r.RES_ABONO3,r.RES_ABONO4,r.RES_ABONO5,r.RES_ABONO6, r.RES_OBSERVACIONES,r.RES_OBSERVACIONES_FACTURA, r.RES_FECHA_ABONO1,r.RES_FECHA_ABONO2,r.RES_FECHA_ABONO3, r.RES_FECHA_ABONO4,r.RES_FECHA_ABONO5,r.RES_FECHA_ABONO6,  r.RES_CUEN_ABONO1,cue.CTA_NOMBRE AS CTA_NOMBRE1,r.RES_CUEN_ABONO2,cue2.CTA_NOMBRE AS CTA_NOMBRE2,r.RES_CUEN_ABONO3,cue3.CTA_NOMBRE AS CTA_NOMBRE3,r.RES_CUEN_ABONO4,cue4.CTA_NOMBRE AS CTA_NOMBRE4,r.RES_CUEN_ABONO5,cue5.CTA_NOMBRE AS CTA_NOMBRE5,r.RES_CUEN_ABONO6,cue6.CTA_NOMBRE AS CTA_NOMBRE6,c.CLN_ID, c.CLN_NOMBRE,c.CLN_CEDULA,c.CLN_CELULAR,c.CLN_DIRECCION,t.TOU_ID, t.TOU_NOMBRE,t.TOU_FECHA,t.TOU_VALORNETO, t.TOU_VALORCOMISIONABLE, t.TOU_INFANTE, t.TOU_NINO, t.TOU_ADULTO, t.TOU_ADULTO_MAYOR, t.TOU_AGENCIAS, t.TOU_CODIGO_AEROLINEA,t.TOU_VUELO_SALIDA,t.TOU_HORA_SALIDA,t.TOU_VUELO_REGRESO,t.TOU_HORA_REGRESO FROM reserva AS r INNER JOIN cliente AS c ON r.CLN_ID = c.CLN_ID INNER JOIN tour AS t ON r.TOU_ID = t.TOU_ID INNER JOIN cuentas AS cue ON r.RES_CUEN_ABONO1 = cue.CTA_ID INNER JOIN cuentas AS cue2 ON r.RES_CUEN_ABONO2 = cue2.CTA_ID INNER JOIN cuentas AS cue3 ON r.RES_CUEN_ABONO3 = cue3.CTA_ID INNER JOIN cuentas AS cue4 ON r.RES_CUEN_ABONO4 = cue4.CTA_ID INNER JOIN cuentas AS cue5 ON r.RES_CUEN_ABONO5 = cue5.CTA_ID INNER JOIN cuentas AS cue6 ON r.RES_CUEN_ABONO6 = cue6.CTA_ID INNER JOIN cuentas AS cueacom ON r.RES_ACOM_CUENT = cueacom.CTA_ID INNER JOIN cuentas AS cuextra ON r.RES_EXTRA_CUENT = cuextra.CTA_ID INNER JOIN grupo AS g ON r.GRP_ID = g.GRP_ID where r.GRP_ID =  ?',[id]);
        console.log(listarReserva);
        return res.json(listarReserva)
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
// const getEditReservas = async (req, res) => {

//     try {
//         const {id} = req.params;
//         const editarReserva = await pool.query('SELECT * FROM reserva WHERE RES_ID = ?',[id]);
//         res.render('reservas/editar_reserva',{editarReserva:editarReserva[0]} );    
//     } catch (error) {
//         res.json({"message_error":500,
//         "description":"Error en query editar get Reservas",
//         "Error":error })
//     }

// }

//Editar get objetos
const getEditReservas = async (req, res) => {

    try {
        const {id} = req.params;
        const editarReserva = await pool.query('SELECT * FROM reserva WHERE GRP_ID = ?',[id]);
        res.json(editarReserva);    
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query editar GET Reservas",
        "Error":error })
    }

}

//Editar post
const putReservas = async (req, res) => {
    try {
        const {id} = req.params;
        const nuevaReserva = req.body;
        console.log("id "+id);
        //console.log(nuevaReserva);
        //console.log(nuevaReserva.reserva[0]);

        const idreservas = await pool.query('SELECT res_id FROM reserva WHERE GRP_ID = ?',[id]);

        console.log("array reservas "+idreservas.length);
        console.log(idreservas);
        //console.log(idreservas[1].res_id);

        for(i=0;i<idreservas.length;i++){
            console.log("For");
            console.log(nuevaReserva.reserva[i]);
            nuevaReserva.reserva[i].RES_VALOR_TOTAL = (nuevaReserva.reserva[i].RES_EXTRA+nuevaReserva.reserva[i].RES_ACOM+nuevaReserva.reserva[i].RES_VALOR_UNITARIO)   
            console.log(nuevaReserva.reserva[i]);
            await pool.query('UPDATE reserva set ? WHERE GRP_ID = ? and RES_ID = ?', [nuevaReserva.reserva[i],id,idreservas[i].res_id]);
            console.log("Reserva Actualizada");
           }
        res.json({"message":"Registro Agregado  correctamente"})
    } catch (error) {
        res.json({"message_error":500,
        "description":"Error en query editar POST  Reservas",
        "Error":error })
    }

}

module.exports = { postReservas, getReservas, getIdReservas, getIdReservasGrupo,deleteReservas, getEditReservas,putReservas}