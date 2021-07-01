const Pacientes = require('../models/Pacientes');

exports.getPacientes = (req, res)=>{
    Pacientes.findAll({}).then((pacientes)=>{
        res.render('pages/pacientes', {pacientes:pacientes});
    })
    .catch((erro)=>{
        res.json("Houve erro:"+ erro);
    })
};