const Pacientes = require('../models/Pacientes');

exports.getPacientes = (req, res)=>{

    const {page}  = req.query;

    const limitPorPagina = Number.parseInt(20);
    const pageNumber = Number.parseInt(page);
    const ArrayIniciarMaisUm = Number.parseInt(1)


    if(!Number.isNaN(pageNumber) && pageNumber>0){

        Pacientes.findAndCountAll({
            order: [
                ['dataCriacao', 'DESC']
            ],
            limit: limitPorPagina,
            offset: (pageNumber - ArrayIniciarMaisUm) * limitPorPagina

        }).then((pacientes)=>{
            res.render('pages/pacientes', {pacientes: pacientes});
        })
        .catch((erro)=>{
            res.json({Catch: erro})
        })
    }else{
        res.json({erro: "Houve um erro na validação do req.query"})
    }

    
};