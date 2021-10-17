const Pacientes = require('../models/Pacientes');


exports.atualizarDadosPaciente = (req, res)=>{

    let {id} = req.params;

    

    let idArray = id.split(",");

    idArray.forEach(itemId => {
        Pacientes.update({
            AtendenteRegistro: req.body.atendenteRegistro,
            Status: req.body.statusRegistro,
            informacaoRegistro: req.body.informacaoRegistro
        },{
            where:{
                id : itemId
            }
        }).then(result=>{
            console.log('Paciente atualizado:', result)
        }).catch(err=>{
            console.log("Error para atualizar paciente(s): ", err)
        })
    });


}