const Pacientes = require('../models/Pacientes');


exports.atualizarDadosPaciente = (req, res)=>{

    let {matricula} = req.params;

    

    let matriculasArray = matricula.split(",");

    matriculasArray.forEach(itemMatricula => {
        Pacientes.update({
            AtendenteRegistro: req.body.atendenteRegistro,
            Status: req.body.statusRegistro,
            informacaoRegistro: req.body.informacaoRegistro
        },{
            where:{
                matricula : itemMatricula
            }
        }).then(result=>{
            console.log('Paciente atualizado:', result)
        }).catch(err=>{
            console.log("Error para atualizar paciente(s): ", err)
        })
    });


}