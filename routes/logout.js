const express = require('express');
const router = express.Router();
const logoutController = require('../controller/logout-controller')

router.get('/', logoutController.sairDoUsuario);


module.exports = router;