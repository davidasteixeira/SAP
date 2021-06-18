const express = require('express');
const router = express.Router();
const Pacientes = require('../models/Pacientes');

//pagina inicial 
router.get('/', (req, res)=>{
    res.render('pages/inicio')
})

router.post('/enviado', (req,res)=>{
    Pacientes.create({
        Matricula: req.body.matricula,
        Atendente: req.body.atendente,
        Nome: req.body.nome,
        Nascimento: req.body.nascimento,
        Telefone: req.body.telefone,
        Celular: req.body.celular,
        Especialidade: req.body.especialidade,
        Observacao: req.body.observacao
    }).then(()=>{
        res.redirect('/')
    }).catch(erro=>{
        res.send('Houve um erro: '+ erro)
    })
});


module.exports = router;