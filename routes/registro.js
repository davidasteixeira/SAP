const express = require('express');
const router = express.Router();
const usuarios = require('../models/Usuarios');

router.get('/', (req,res)=>{
    res.render('pages/registro');
})

router.post('/cadastrado', (req,res)=>{
    usuarios.create({
        nome: req.body.nome,
        login: req.body.login,
        senha: req.body.senha,
        perfil: req.body.perfil
    })
    .then(()=>{
        res.redirect('/registro')
    })
    .catch(error=>{
        console.log('Houve um erro:', error);
        res.json({error_msg:`${error}`});
    })
})



module.exports = router;