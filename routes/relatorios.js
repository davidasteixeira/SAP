const express = require('express');
const router = express.Router();
const {validarPerfil} = require('../helpers/validarUsuario');
const especialController = require("../controller/rel-espec-controller");
const relatorioController = require("../controller/relatorio-controller");
const formEscpecController = require("../controller/form-espec-controller");
const abaSituacaoController = require("../controller/aba-situacao-controller");

router.get('/', validarPerfil, relatorioController.relatorio);

router.get('/report-especialidades', validarPerfil, formEscpecController.formEspec);

router.get('/report-especialidades/view', validarPerfil, especialController.especialidadesStatus);

router.get('/report-situacao', validarPerfil, abaSituacaoController.situacao);


module.exports = router;