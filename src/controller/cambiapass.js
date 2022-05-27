const bcryptjs = require('bcryptjs')
const conexion = require('../database')

//Agregar
const postNewPass = async (req, res) => {

    try {
        const nuevopass = req.body;
        console.log(nuevopass)
        const rol = nuevopass.rol_id
        const password =  await bcryptjs.hash(req.body.rol_password,8)
        console.log(password)
        console.log(rol)
        conexion.query("UPDATE rol SET ROL_PASSWORD=? WHERE rol_id=?",[password,rol]);
        res.json({"message":"Cambio Pass correctamente"})
    } catch (error) {
        console.log(error)
        res.json({"message_error":500,
        "description":"Error en query Cambiar Pass",
        "Error":error })
    }
}

module.exports = { postNewPass}