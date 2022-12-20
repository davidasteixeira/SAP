const Usuario = require('../models/Usuarios');
const {Op} = require('sequelize'); 

exports.filtrarUsuario = (req,res)=>{

    const {nome, perfil, usuario} = req.query;
    const {page}  = req.params;

    console.log(nome, perfil, usuario);
  
    let usuarioFilter = {login: usuario}
    let perfilFilter = {perfil: perfil}

    var dadosDeBusca = []

    if(usuario !== '' && usuario.length>0 ){
        dadosDeBusca.push(usuarioFilter)
    }

    if(perfil !== '' && perfil.length>0){
        dadosDeBusca.push(perfilFilter)
    }
    
    if(nome !== '' && nome.length>0){
        dadosDeBusca.push({nome:{[Op.regexp]: nome}});
    }

    const limitPorPagina = Number.parseInt(30);
    const pageNumber = Number.parseInt(page);
    const ArrayIniciarMaisUm = Number.parseInt(1)

    if(!Number.isNaN(pageNumber) && pageNumber>0){
        Usuario.findAndCountAll({
            limit: limitPorPagina,
            offset: (pageNumber - ArrayIniciarMaisUm) * limitPorPagina,
            where: dadosDeBusca,
            order: [
                ['id', 'ASC']
            ]
        }).then((usuarios)=>{
            //idPagina é para identificar que é página do filter que vai ser redenziarada e partials de paginação identificar.
            res.render('pages/usuarios',{usuarios:usuarios, idPagina:2, paginaAtual: page,
                filterNome: nome,
                filterPerfil: perfil,
                filterUsuario: usuario,
            });
        })
        .catch((erro)=>{
            res.render('pages/usuarios', {error: 'Houve um erro, tente novamente'})
        })
    }else{
        res.render('pages/usuarios', {error: 'Houve um erro, contate o administrador'})
    }
}