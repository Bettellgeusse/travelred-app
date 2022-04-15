const  passport  = require('passport');
const  LocalStrategy  = require('passport-local').Strategy;

const  pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signin', new LocalStrategy({
      usernameField:'rol_nombre',
      passwordField:'rol_password',
      passReqToCallback: true
}, async (req, rol_nombre, rol_password, done) =>{
  
   const rows = await pool.query('SELECT * FROM rol WHERE ROL_NOMBRE = ?', [rol_nombre]);
   console.log(req.body);
   if(rows.length > 0 ){
     const user = rows[0];
     const validPassword = await helpers.matchPassword(rol_password, user.ROL_PASSWORD);
     console.log('validado')
     console.log(validPassword);

     if(validPassword){
        done(null, user, req.flash('success','Bienvenido' + user.ROL_NOMBRE));
        console.log('A pasado la validacion');
        console.log(user);
     }
     else{
       done(null, false, req.flash('message','Incorrecto'));
       console.log('incorrecto')
     }
   }else{
      console.log('no existe')
      return done(null, false, req.flash('message','Nombre de usuario no existe'));
      
   }


}));

passport.use('local.signup', new LocalStrategy({
     usernameField:'ROL_NOMBRE',
     passwordField:'ROL_PASSWORD',
     passReqToCallback: true
}, async (req, ROL_NOMBRE, ROL_PASSWORD, done) => {
      const { ROL_APELLIDO,ROL_CELULAR, ROL_CORREO, ROL_CEDULA, ROL_CARGO, ROL_VALORCOMISION} = req.body;
      const nuevoUsuario = {
         ROL_NOMBRE,
         ROL_PASSWORD,
         ROL_APELLIDO,
         ROL_CELULAR, 
         ROL_CORREO, 
         ROL_CEDULA, 
         ROL_CARGO, 
         ROL_VALORCOMISION
      }
      nuevoUsuario.ROL_PASSWORD = await helpers.encryptPassword(ROL_PASSWORD);
      const resultado = await pool.query('INSERT INTO rol SET ?', [nuevoUsuario]);
      nuevoUsuario.ROL_ID = resultado.insertId;
      //console.log(nuevoUsuario);
      return done(null, nuevoUsuario);
}));

 passport.serializeUser((user, done)=> {
   console.log('por aca estoy ');
   done(null, user.ROL_ID);
   //console.log(user.rol_nombre);
   //console.log(user.rol_id);
});

passport.deserializeUser(async (ROL_ID, done)=> {
    
    const rows = await pool.query('SELECT * FROM rol WHERE ROL_ID = ?', [ROL_ID]);
    console.log('estoy aqui ');
    console.log(rows);
    done(null, rows[0]);
 });