const express = require('express');
const Pacientes = require('../models/Pacientes');
const router = express.Router();
const pacienteController = require('../controller/paciente-controller');
const {validarUsuario} = require('../helpers/validarUsuario');
const filterController = require("../controller/filter-controller");

//pagina listagem de pacientes 
router.get('/', (req, res, next)=>{
    res.render('pages/pacientes', {pacientes: pacientes})
})


router.get('/page:page', pacienteController.getPacientes);

router.post('/', validarUsuario, filterController.filtrarPaciente)

module.exports = router;