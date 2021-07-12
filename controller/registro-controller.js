const usuarios = require('../models/Usuarios');



exports.cadastroUsuarios = (req,res)=>{
    usuarios.create({
        nome: req.body.nome,
        login: req.body.login,
        senha: req.body.senha,
        perfil: req.body.perfil
    })
    .then((callback)=>{
        res.render('pages/registro')
    })
    .catch(error=>{
        res.send('Houve um erro', error);
        
    })
};