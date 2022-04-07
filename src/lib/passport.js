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
     console.log(validPassword);

     if(validPassword){
        done(null, user, req.flash('success','Bienvenido' + user.ROL_NOMBRE));
        console.log(user);
     }
     else{
       done(null, false, req.flash('message','Incorrecto'));
     }
   }else{
      return done(null, false, req.flash('message','Nombre de usuario no existe'));
   }


}));

passport.use('local.signup', new LocalStrategy({
     usernameField:'rol_nombre',
     passwordField:'rol_password',
     passReqToCallback: true
}, async (req, rol_nombre, rol_password, done) => {
      const { rol_apellido,rol_celular, rol_correo, rol_cedula, rol_cargo, rol_valorcomision} = req.body;
      const nuevoUsuario = {
        rol_nombre,
        rol_password,
        rol_apellido,
        rol_celular, 
        rol_correo, 
        rol_cedula, 
        rol_cargo, 
        rol_valorcomision
      }
      nuevoUsuario.rol_password = await helpers.encryptPassword(rol_password);
      const resultado = await pool.query('INSERT INTO rol SET ?', [nuevoUsuario]);
      nuevoUsuario.id = resultado.insertId;
      return done(null, nuevoUsuario);
}));

 passport.serializeUser((user, done)=> {
   done(null, user.ROL_ID);
});

passport.deserializeUser(async (ROL_ID, done)=> {
    
    const rows = await pool.query('SELECT * FROM rol WHERE ROL_ID = ?', [ROL_ID]);
    //console.log('estoy aqui ');
    //console.log(rows);
    done(null, rows[0]);
 });