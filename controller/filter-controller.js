const Pacientes = require('../models/Pacientes');
const {Op} = require('sequelize'); 

exports.filtrarPaciente = (req,res)=>{

    const {matricula, data, data2, status, especialidade, nome} = req.query;
  
    let matriculaFilter = {matricula: matricula}
    let dataFilter = {dataCriacao: data}
    let statusFilter = {status: status}
    let especialidadeFilter = {especialidade: especialidade}

    var dadosDeBusca = []

    if(matricula !== '' && matricula.length>0 ){
        dadosDeBusca.push(matriculaFilter)
    }

    if((data !== '' && data.length>0)&&(data2 == '' && data2.length==0)){
        dadosDeBusca.push(dataFilter)
    }

    if((data !== '' && data.length>0)&&(data2 !== '' && data2.length>0)){
        dadosDeBusca.push({
            dataCriacao:{[Op.between]:[data,data2]}
        })
    }

    if(status !== '' && status.length>0){
        dadosDeBusca.push(statusFilter)
    }

    if(especialidade !== '' && especialidade.length>0){
        dadosDeBusca.push(especialidadeFilter)
    }

    if(nome !== '' && nome.length>0){
        dadosDeBusca.push(
            {nome:{[Op.regexp]: nome}}
        )
    }

    const {page}  = req.params;

    const limitPorPagina = Number.parseInt(10);
    const pageNumber = Number.parseInt(page);
    const ArrayIniciarMaisUm = Number.parseInt(1)

    if(!Number.isNaN(pageNumber) && pageNumber>0){
        Pacientes.findAndCountAll({
            limit: limitPorPagina,
            offset: (pageNumber - ArrayIniciarMaisUm) * limitPorPagina,
            where: dadosDeBusca,
            order: [
                ['id', 'ASC']
            ]
        }).then((pacientes)=>{
            //idPagina é para identificar que é página do filter que vai ser redenziarada e partials de paginação identificar.
            res.render('pages/pacientes',{pacientes:pacientes, idPagina:2, paginaAtual: page,
                filterMatricula: matricula,
                filterData: data,
                filterDataFinal: data2,
                filterStatus: status,
                filterEspecialidade: especialidade,
                filterNome: nome
            });
        })
        .catch((erro)=>{
            res.render('pages/pacientes', {error: 'Houve um erro, tente novamente'})
        })
    }else{
        res.render('pages/pacientes', {error: 'Houve um erro, contate o administrador'})
    }
}