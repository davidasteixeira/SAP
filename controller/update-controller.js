const Pacientes = require('../models/Pacientes');


exports.atualizarDadosPaciente = (req, res)=>{

    let {matricula} = req.params;

    

    let matriculasArray = matricula.split(",");

    matriculasArray.forEach(itemMatricula => {
        Pacientes.update({
            Status: req.body.statusRegistro,
            AtendenteRegistro: req.body.atendenteRegistro,
            informacaoRegistro: req.body.informacaoRegistro
        },{
            where:{
                matricula : itemMatricula
            }
        }).then(result=>{
            console.log("Paciente atualizado com sucesso, Resultado JSON:",result);
            
        }).catch(err=>{
            console.log("Error para atualizar: ", err)
        })
    });


}