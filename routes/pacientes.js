const express = require('express');
const Pacientes = require('../models/Pacientes');
const router = express.Router();
const pacienteController = require('../controller/paciente-controller');
const {validarUsuario} = require('../helpers/validarUsuario');

//pagina listagem de pacientes 
router.get('/', validarUsuario, pacienteController.getPacientes);


module.exports = router;