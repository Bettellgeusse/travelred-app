const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database')
const {promisify} = require('util')


//Metodo para registro

exports.register = async (req,res)=>{

    try {
        const name = req.body.name
        const apellido = req.body.apellido
        const cedula = req.body.cedula
        const pass = req.body.pass
        const correo = req.body.correo
        const celular = req.body.celular
        const cargo = req.body.cargo
        const comision = req.body.comision
        let passHash = await bcryptjs.hash(pass,8)
        //console.log(name+" - "+apellido+" - "+cedula+" - "+passHash+" - "+correo+" - "+celular+" - "+cargo+" - "+comision)
        conexion.query('INSERT INTO rol SET ?',{ROL_NOMBRE:name,ROL_APELLIDO:apellido,ROL_CEDULA:cedula,ROL_PASSWORD:passHash,ROL_CORREO:correo,ROL_CELULAR:celular,ROL_CARGO:cargo,ROL_VALORCOMISION:comision},(error, results)=>{
            if(error){console.log(error)}
            res.redirect('/')
        })
    } catch (error) {
        console.log(error)
    }
     
}

exports.login = async (req,res)=>{
    try {
        const cedula = req.body.cedula
        const pass = req.body.pass
        //console.log(cedula+" - "+pass)
        if(!cedula || !pass){
            res.render('login',{
                alert:true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un usuario y password",
                alertIcon:'info',
                showConfirmButton:true,
                timer:false,
                ruta:'login'
            })
        }else{
            conexion.query('SELECT * FROM rol WHERE ROL_CEDULA = ?', [cedula], async (error, results)=>{
                if( results.length == 0 || ! (await bcryptjs.compare(pass, results[0].ROL_PASSWORD)) ){
                    res.render('login', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Usuario y/o Password incorrectas",
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'    
                    })
                }else{
                    //inicio de sesión OK
                    const id = results[0].ROL_ID
                    console.log("validando id "+id);
                    const token = jwt.sign({id:id}, process.env.JWT_SECRETO, {
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                    })
                    //generamos el token SIN fecha de expiracion
                   //const token = jwt.sign({id: id}, process.env.JWT_SECRETO)
                   console.log("TOKEN: "+token+" para el USUARIO : "+cedula)

                   const cookiesOptions = {
                        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly: true
                   }
                   res.cookie('jwt', token, cookiesOptions)
                   res.render('login', {
                        alert: true,
                        alertTitle: "Conexión exitosa",
                        alertMessage: "¡LOGIN CORRECTO!",
                        alertIcon:'success',
                        showConfirmButton: false,
                        timer: 800,
                        ruta: ''
                   })
                }
            })

            
        }

    } catch (error) {
        
    }
}

exports.isAuthenticated = async (req, res, next)=>{
    if (req.cookies.jwt) {
        console.log(req.cookies.jwt)
        
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            conexion.query('SELECT * FROM rol WHERE ROL_ID = ?', [decodificada.id], (error, results)=>{
                if(!results){return next()}
                req.user = results[0]
                console.log(req.user)
                return next()
            })
        } catch (error) {
            console.log("mal")
            console.log(error)
            return next()
        }
    }else{
        console.log("sali")
        res.redirect('/login')        
    }
}

exports.logout = (req, res)=>{
    res.clearCookie('jwt')   
    return res.redirect('/')
}