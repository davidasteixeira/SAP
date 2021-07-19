const express = require('express');
const passport = require('passport');
const router = express.Router();


router.get('/', (req,res)=>{
    res.render('pages/login');
})

router.post('/', (req, res, next)=>{
    passport.authenticate('local',{
        successRedirect:'/',
        failureRedirect: '/login',
        failureMessage: true,
        failureMessage: "Ocorreu um erro na autenticação",
        successFlash: "Bem vindo ao SAP"
    })(req,res,next);
    
})

module.exports = router;