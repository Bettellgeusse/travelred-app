const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database')
const {promisify} = require('util')


//Metodo para registro

exports.register = async (req,res)=>{

    try {
        // const name = req.body.name
        // const apellido = req.body.apellido
        // const cedula = req.body.cedula
        // const pass = req.body.pass
        // const correo = req.body.correo
        // const celular = req.body.celular
        // const cargo = req.body.cargo
        // const comision = req.body.comision

        const nuevoUsuario = req.body;
        nuevoUsuario.ROL_PASSWORD = await bcryptjs.hash(req.body.ROL_PASSWORD,8)
        console.log(nuevoUsuario)
        //console.log(name+" - "+apellido+" - "+cedula+" - "+passHash+" - "+correo+" - "+celular+" - "+cargo+" - "+comision)
        // conexion.query('INSERT INTO rol SET ?',{ROL_NOMBRE:name,ROL_APELLIDO:apellido,ROL_CEDULA:cedula,ROL_PASSWORD:passHash,ROL_CORREO:correo,ROL_CELULAR:celular,ROL_CARGO:cargo,ROL_VALORCOMISION:comision},(error, results)=>{
           conexion.query('INSERT INTO rol SET ?',[nuevoUsuario],(error, results)=>{
          if(error){console.log(error)}
             res.json({"message":"Usuario Agregado correctamente"})
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
            console.log("Ingrese un usuario y password")
            // res.render('login',{
            //     alert:true,
            //     alertTitle: "Advertencia",
            //     alertMessage: "Ingrese un usuario y password",
            //     alertIcon:'info',
            //     showConfirmButton:true,
            //     timer:false,
            //     ruta:'login'
            // })
        }else{
            console.log(cedula)
            conexion.query('SELECT * FROM rol WHERE ROL_CEDULA = ?', [cedula], async (error, results)=>{

                if( results.length == 0 || ! (await bcryptjs.compare(pass, results[0].ROL_PASSWORD)) ){
                    console.log(results)
                    console.log("Usuario y/o Password incorrectas")
                    // res.render('login', {
                    //     alert: true,
                    //     alertTitle: "Error",
                    //     alertMessage: "Usuario y/o Password incorrectas",
                    //     alertIcon:'error',
                    //     showConfirmButton: true,
                    //     timer: false,
                    //     ruta: 'login'    
                    // })
                }else{
                    //inicio de sesión OK
                    const id = results[0].ROL_ID
                    console.log("validando id "+id);
                    console.log(process.env.JWT_SECRETO)
                    const token = jwt.sign({id:id}, "super_secret", {
                        //expiresIn: '7d'
                    })
                    //generamos el token SIN fecha de expiracion
                   //const token = jwt.sign({id: id}, process.env.JWT_SECRETO)
                   console.log("TOKEN: "+token+" para el USUARIO : "+cedula)

                   const cookiesOptions = {
                        expires: new Date(Date.now()+ 90 * 24 * 60 * 60 * 1000),
                        httpOnly: true
                   }
                   
                   res.cookie('jwt', token, cookiesOptions)
                   res.render('inicio',)
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
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, "super_secret")
            console.log("decodificada"+decodificada.id)
            conexion.query('SELECT * FROM rol WHERE ROL_ID = ?', [decodificada.id], (error, results)=>{
                if(!results){return next()}
                console.log(results[0])
                req.user = results[0]
                console.log("este es mi usuario"+req.user.ROL_ID)
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
    console.log("elimino pa cookie")
    return res.redirect('/')
}