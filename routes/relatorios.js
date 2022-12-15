const express = require('express');
const router = express.Router();
const {validarPerfil} = require('../helpers/validarUsuario');
const especialController = require("../controller/rel-espec-controller");
const relatorioController = require("../controller/relatorio-controller");
const formEscpecController = require("../controller/form-espec-controller");
const abaSituacaoController = require("../controller/aba-situacao-controller");
const controllerEspecialidadeStatusExcel = require("../controller/rel-espec-status");
const formRegistrosExcel = require('../controller/form-registros-excel');

router.get('/', validarPerfil, relatorioController.relatorio);

router.get('/report-especialidades', validarPerfil, formEscpecController.formEspec);

router.get('/report-especialidades/view', validarPerfil, especialController.especialidadesStatus);

router.get('/report-situacao', validarPerfil, abaSituacaoController.situacao);

router.get('/report-registros',validarPerfil, formRegistrosExcel.formRegExcel);

router.get('/report/download', validarPerfil, controllerEspecialidadeStatusExcel.relatorioExcelEspecStatus);


module.exports = router;