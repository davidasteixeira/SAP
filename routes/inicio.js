const express = require('express');
const router = express.Router();
const inicioController = require('../controller/inicio-controller');
const {validarUsuario} = require('../helpers/validarUsuario');

router.get('/', validarUsuario, (req, res)=>{
    res.render('pages/inicio')
})

router.post('/enviado', validarUsuario, inicioController.cadastroPaciente);


module.exports = router;