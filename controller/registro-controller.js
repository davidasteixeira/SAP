const usuarios = require('../models/Usuarios');
const bcrypt = require('bcrypt');



exports.cadastroUsuarios = (req,res)=>{
    var erros= [];

    if(/[0-9ÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑáàâãéèêíìïóòôõöúçñ]/.test(req.body.nome)){
        erros.push({texto:'Nome não pode ter números ou caracteres especiais'})
    }
    
    if(/[0-9ÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑáàâãéèêíìïóòôõöúçñ]/.test(req.body.login)){
        erros.push({texto:'Usuário não pode ter caracteres especiais ou números'})
    }else if(!/([A-Za-z]{3,12}[\.][A-Za-z]{3,10})/.test(req.body.login)){
        erros.push({texto: 'Usuário não é válido'})
    }

    if(req.body.senha !== req.body.confirmeSenha){
        erros.push({texto: 'Senhas são diferentes, tente novamente.'})
    }

    if(req.body.senha.length<4 || req.body.confirmeSenha.length<4){
        erros.push({texto: 'Senha é curta, digite senha acima de 5 caracteres'})
    }

    if(req.body.perfil === undefined || req.body.perfil === null ){
        erros.push({texto: 'Informe o tipo de perfil'})
    }

    if(erros.length>0){
        req.flash('error_msg', erros);
        res.redirect('/registro');
    }else{
        usuarios.findOne({
            where: {
                login: req.body.login
            }
        }).then((result)=>{
            if(result === null){

                bcrypt.genSalt(10, (erro,salt)=>{
                    bcrypt.hash(req.body.senha, salt, (erro, hash)=>{
                        if(erro){
                            req.flash('error_msg', {texto:"Houve um erro para salvar os dados do usuário"});
                            res.redirect('/registro');
                        }

                        usuarios.create({
                            nome: req.body.nome,
                            login: req.body.login,
                            senha: hash,
                            perfil: req.body.perfil
                        })
                        .then((usuario)=>{
                            req.flash('sucess_msg', 'Cadastrado com sucesso');
                            res.redirect('/registro');
                        })
                        .catch(error=>{
                            req.flash('error_msg', {texto:"Houve um erro, tente novamente"});
                            res.redirect('/registro');
                        });

                    })
                })
            }else{
                req.flash('info_msg', "Usuário já existe");
                res.redirect('/registro')
            }
        }).catch((error)=>{
            req.flash('error_msg', {texto: "Ocorreu um erro na busca do usuário"});
            res.redirect('/registro')
        })

    }


};