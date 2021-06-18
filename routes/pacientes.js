const express = require('express');
const Pacientes = require('../models/Pacientes');
const router = express.Router();

//pagina listagem de pacientes 
router.get('/', (req, res)=>{
    Pacientes.findAll({}).then((pacientes)=>{
        res.render('pages/pacientes', {pacientes:pacientes});
    })
    .catch((erro)=>{
        console.log("Houve erro:"+ erro);
    })
})



module.exports = router;