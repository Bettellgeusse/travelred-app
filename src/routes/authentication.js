const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth')
const authController = require('../controller/auth')

router.get('/signup', (req,res)=>{
     res.render('auth/signup');
});

router.post('/signup',  passport.authenticate('local.signup', {
    successRedirect: '/inicio',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/signin',  (req,res)=>{
    res.render('auth/signin');
});

router.post('/signin', (req,res, next)=>{   
    passport.authenticate('local.signin',{
        successRedirect: '/inicio',
        failureRedirect: '/signin',
        failureFlash: true
    })(req,res,next);
});

router.get('/inicio', authController.isAuthenticated, (req,res)=>{
    res.render('inicio');
    console.log('adentro');
});

router.get('/logout',  (req,res)=>{
    console.log('afuera');
    req.logOut();
    res.redirect('/signin');
});



module.exports = router;