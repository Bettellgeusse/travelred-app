const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const { engine } = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');

const { database } = require('./keys');


//inicializar 
const app = express();
require('./lib/passport');

//Configuraciones
app.set('port', process.env.PORT || 4000);
app.set('views',path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    dafaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Widdlewares
app.use(session({
    secret: 'administrador',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database),
    cookie: {
        sameSite: "none", //add this line
      }
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


//Global Variables
app.use((req, res, next)  => {
    app.locals.success = req.flash('success');
    app.locals.success = req.flash('message');
    app.locals.user = req.user;
    next();
});
//Routes 
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/clientes',require('./routes/clientes'));
app.use('/ahorro',require('./routes/ahorro'));
app.use('/cuentas',require('./routes/cuentas'));
app.use('/grupos',require('./routes/grupos'));
app.use('/tours',require('./routes/tours'));
app.use('/reservas',require('./routes/reservas'));
app.use('/cajamayor',require('./routes/cajamayor'));
app.use('/cajamenor',require('./routes/cajamenor'));
app.use('/devoluciones',require('./routes/devoluciones'));

//Public
app.use(express.static(path.join(__dirname, 'public')));


//Starting the server
app.listen(app.get('port'),  () => {
    console.log('Serve on port', app.get('port'));
});

if (app.get("env") === "production") {
    // trust first proxy for Heroku production deployment
    app.set("trust proxy", 1);
    // serve secure cookies, requires https
    session.cookie.secure = true;
  }
