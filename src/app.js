const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const { engine } = require('express-handlebars');
const session = require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);

const Auth0Strategy = require("passport-auth0");

const { database } = require('./keys');


//inicializar 
const app = express();
app.set('trust proxy', true) // trust first proxy
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
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(session({
    secret: 'administrador',
    resave: true,
    saveUninitialized: true,
    cookie: {
        sameSite: "none",
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7, // One Week
      },
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());



//Global Variables
app.use((req, res, next)  => {
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
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


