const express = require('express');
const Pacientes = require('../models/Pacientes');
const router = express.Router();
const pacienteController = require('../controller/paciente-controller');

//pagina listagem de pacientes 
router.get('/', pacienteController.getPacientes);


module.exports = router;