const Pacientes = require('../models/Pacientes');

exports.cadastroPaciente = (req,res)=>{
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
        req.flash('sucess_msg','Paciente Cadastrado')
        res.redirect('/')
    }).catch(erro=>{
        req.flash('error_msg','Houve um erro, Tente novamente');
        console.log(erro)
        res.redirect('/')
    })
}
