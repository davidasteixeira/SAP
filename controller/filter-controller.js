const Pacientes = require('../models/Pacientes');
const {Op} = require('sequelize'); 

exports.filtrarPaciente = (req,res)=>{
  
    let matricula = {matricula: req.body.matricula}
    let data = {DataCriacao: req.body.data}
    let status = {status: req.body.status}
    let especialidade = {especialidade: req.body.especialidade}
    let nome = {nome: req.body.nome}

    Pacientes.findAll({
        where : {
            [Op.or]: [
                matricula,
                status,
                data,
                especialidade,
                nome
            ]
        }
    }).then((pacientes)=>{
        res.render('pages/pacientes', {pacientes:pacientes});
    })
    .catch((erro)=>{
        res.json("Houve erro:"+ erro);
    })
}