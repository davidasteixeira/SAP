const express = require('express');
const router = express.Router();
const registroController = require('../controller/registro-controller');

router.get('/', (req,res)=>{
    res.render('pages/registro');
})

router.post('/cadastrado', registroController.cadastroUsuarios); 



module.exports = router;