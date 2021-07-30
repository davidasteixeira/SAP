const Pacientes = require('../models/Pacientes');

exports.getPacientes = (req, res)=>{
    const page = req.params.page;
    const limitPorPagina = 10;
    
    Pacientes.findAndCountAll({
        limit: limitPorPagina,
        offset: page * limitPorPagina
    }).then((pacientes)=>{
        //res.render('pages/pacientes',{pacientes:pacientes});
        res.json({pacientes: pacientes.rows})
    })
    .catch((erro)=>{
        res.json("Houve erro:"+ erro);
    })
};