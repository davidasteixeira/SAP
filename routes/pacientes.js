const express = require('express');
const router = express.Router();
const pacienteController = require('../controller/paciente-controller');
const {validarUsuario} = require('../helpers/validarUsuario');
const filterController = require("../controller/filter-controller");
const updateContrller = require("../controller/update-controller");
const especialidadesController = require("../controller/especialidades-controller");

router.get('/', validarUsuario, pacienteController.getPacientes);

router.get('/filter/page=:page', validarUsuario, filterController.filtrarPaciente);

router.post('/update/:id', validarUsuario, updateContrller.atualizarDadosPaciente);

router.get('/especialidades/:status',especialidadesController.getEspeciliades);

module.exports = router;