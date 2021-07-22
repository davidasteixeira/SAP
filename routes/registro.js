const express = require('express');
const router = express.Router();
const registroController = require('../controller/registro-controller');
const {validarAdmin} = require('../helpers/validarUsuario');


router.get('/', validarAdmin, (req,res)=>{
    res.render('pages/registro');
})

router.post('/cadastrado', validarAdmin, registroController.cadastroUsuarios); 



module.exports = router;