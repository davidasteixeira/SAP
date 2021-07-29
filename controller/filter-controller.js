const Pacientes = require('../models/Pacientes');
const {Op} = require('sequelize'); 

exports.filtrarPaciente = (req,res)=>{
  
    let matricula = {matricula: req.body.matricula}
    let data = {dataCriacao: req.body.data}
    let status = {status: req.body.status}
    let especialidade = {especialidade: req.body.especialidade}
    let nome = {nome: req.body.nome}

    var dadosDeBusca = []

    if(req.body.matricula !== '' && req.body.matricula.length>0 ){
        dadosDeBusca.push(matricula)
    }

    if(req.body.data !== '' && req.body.data.length>0){
        dadosDeBusca.push(data)
    }

    if(req.body.status !== '' && req.body.status.length>0){
        dadosDeBusca.push(status)
    }

    if(req.body.especialidade !== '' && req.body.especialidade.length>0){
        dadosDeBusca.push(especialidade)
    }

    if(req.body.nome !== '' && req.body.nome.length>0){
        dadosDeBusca.push({
            [Op.or]: [ nome,
            {nome:{[Op.regexp]: req.body.nome}}
            ]
        })
    }

    Pacientes.findAll({
        where: dadosDeBusca
    }).then((pacientes)=>{
        res.render('pages/pacientes', {pacientes:pacientes});
    })
    .catch((erro)=>{
        res.json("Houve erro:"+ erro);
    })
}