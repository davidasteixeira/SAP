const Pacientes = require('../models/Pacientes');

exports.getPacientes = (req, res)=>{

    const {page}  = req.query;

    const limitPorPagina = Number.parseInt(5);
    const pageNumber = Number.parseInt(page);
    const ArrayIniciarMaisUm = Number.parseInt(1)


    if(!Number.isNaN(pageNumber) && pageNumber>0){

        Pacientes.findAndCountAll({
            order: [
                ['id', 'DESC']
            ],
            limit: limitPorPagina,
            offset: (pageNumber - ArrayIniciarMaisUm) * limitPorPagina,
            where:{
                Status:"AGUARDANDO"
            }

        }).then((pacientes)=>{
            //idPagina é para identificar que é página de pacientes que vai ser redenziarada e partials de paginação identificar.
            res.render('pages/pacientes', {pacientes: pacientes, idPagina: 1, paginaAtual:page});
        })
        .catch((erro)=>{
            res.render('pages/pacientes', {error: 'Houve um erro, tente novamente'})
        })
    }else{
        res.render('pages/pacientes', {error: 'Houve um erro, contate o administrador'})
    }

    
};