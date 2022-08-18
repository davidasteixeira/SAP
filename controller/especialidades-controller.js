const {sequelize}= require('../models/db');
const {QueryTypes} = require('sequelize');

exports.getEspeciliades = async(req,res) =>{

    const {status} = req.params;

    if(!status.toUpperCase()){
        res.status(400).json({err:"Status inválido"})
    }else{

        const especialidades = await sequelize.query(
            'SELECT DISTINCT(Especialidade) FROM Pacientes WHERE status = :status',
            {
              replacements: { status: status.toUpperCase() },
              type: QueryTypes.SELECT
            }

        ).then(result=>{
            res.status(200).json(result);
        }).catch(err=>{
            res.status(404).json({err:"Houve um erro na busca dos dados", err:err});
        })
    }

}