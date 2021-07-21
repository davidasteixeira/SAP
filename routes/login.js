const express = require('express');
const router = express.Router();
const loginController = require('../controller/login-controller');


router.get('/', (req,res)=>{
    res.render('pages/login',{
        message: req.flash('sucess')
    });
})

router.post("/", loginController.AutenticarUsuario);

module.exports = router;