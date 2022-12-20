const express = require('express');
const router = express.Router();
const {validarAdmin} = require('../helpers/validarUsuario');
const {getUsuarios, getUsuarioId, editarUsuario, excluirUsuario} = require('../controller/usuario-controller');
const { filtrarUsuario } = require('../controller/user-filter-controller');


router.get('/',validarAdmin, getUsuarios);

router.get('/filter/page=:page', validarAdmin, filtrarUsuario);

router.get('/editar/:id', validarAdmin, getUsuarioId );

router.post('/editar/atualizar', validarAdmin, editarUsuario );

router.delete('/:id',validarAdmin, excluirUsuario);

module.exports = router;