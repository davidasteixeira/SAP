const express = require('express');
const router = express.Router();
const Pacientes = require('../models/Pacientes');
const inicioController = require('../controller/inicio-controller');

//pagina inicial 
router.get('/', (req, res)=>{
    res.render('pages/inicio')
})

router.post('/enviado', inicioController.cadastroPaciente);


module.exports = router;