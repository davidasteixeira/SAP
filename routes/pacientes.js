const express = require('express');
const Pacientes = require('../models/Pacientes');
const router = express.Router();
const pacienteController = require('../controller/paciente-controller');
const {validarUsuario} = require('../helpers/validarUsuario');
const filterController = require("../controller/filter-controller");
const updateContrller = require("../controller/update-controller");

router.get('/', validarUsuario, pacienteController.getPacientes);

router.get('/filter/page=:page', validarUsuario, filterController.filtrarPaciente)


router.post('/update/:matricula', validarUsuario, updateContrller.atualizarDadosPaciente)
module.exports = router;