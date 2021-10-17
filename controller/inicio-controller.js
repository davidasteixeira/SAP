const Pacientes = require('../models/Pacientes');

exports.cadastroPaciente = (req,res)=>{

    const calcularIdade = (dataNascimento) =>{
        let dataAtual = new Date();
        anoAtual = dataAtual.getFullYear(),
        mesAtual = dataAtual.getMonth() + 1,
        diaAtual = dataAtual.getDate()

        //transformando dataNascimento em Array ex: [03, 05, 1996] ordenado pelo dia, mes e ano
        let dataNas = dataNascimento.split(/\//).map(num=>{return parseInt(num)})

        let diaAniversario = dataNas[0]
        let mesAniversario = dataNas[1]
        let anoAniversario = dataNas[2]

        let quantosAnos = anoAtual - anoAniversario;

        if (mesAtual < mesAniversario || mesAtual == mesAniversario && diaAtual < diaAniversario) {
            quantosAnos--;
        }

        
        return quantosAnos;
        
    }

    Pacientes.findOne({
        where:{
            matricula: req.body.matricula,
            status: "AGUARDANDO",
            especialidade: req.body.especialidade
        }
    }).then(response =>{
        if(response === null){
            Pacientes.create({
                Matricula: req.body.matricula,
                Atendente: req.body.atendente,
                Nome: req.body.nome,
                Nascimento: req.body.nascimento,
                Idade:calcularIdade(req.body.nascimento),
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

        }else{
            req.flash('info_msg',`Paciente já cadastrado`)
            res.redirect('/')
        }
        
    })

    
}
