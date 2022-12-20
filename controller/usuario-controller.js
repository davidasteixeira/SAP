const Usuarios = require('../models/Usuarios');
const bcrypt = require('bcrypt');

module.exports = {
    getUsuarios: async (req, res) => {

        const { page } = req.query;

        const limitPorPagina = Number.parseInt(30);
        const pageNumber = Number.parseInt(page);
        const ArrayIniciarMaisUm = Number.parseInt(1)

        if (!Number.isNaN(pageNumber) && pageNumber > 0) {

            await Usuarios.findAndCountAll({
                attributes: ['id', 'nome', 'login', 'perfil'],
                order: [
                    ['id', 'DESC']
                ],
                limit: limitPorPagina,
                offset: (pageNumber - ArrayIniciarMaisUm) * limitPorPagina,

            }).then((usuarios) => {
                //idPagina é para identificar que é página de pacientes que vai ser redenziarada e partials de paginação identificar.
                res.render('pages/usuarios', { usuarios: usuarios, idPagina: 1, paginaAtual: page });
                //res.status(200).json(usuarios);
            })
                .catch((erro) => {
                    res.render('pages/usuarios', { error: 'Houve um erro, tente novamente' });
                    //res.status(500).json({error:"Tente novamente, ocorreu um erro.",err: erro})
                })
        } else {
            res.render('pages/usuarios', { error: 'Houve um erro, contate o administrador' });
            //res.status(404).json({error:"Ocorreu um erro na página solicitada"})
        }

    },

    editarUsuario: async (req, res) => {

        const { id, nome, senha, confirmaSenha, perfil } = req.body;
        var erros = [];

        if (/[0-9ÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑáàâãéèêíìïóòôõöúçñ]/.test(nome)) {
            erros.push({ texto: 'Nome não pode ter números ou caracteres especiais' })
        }

        if (senha !== '' && confirmaSenha !== '') {
            if (senha.length > 1 && senha.length < 4 || confirmaSenha.length > 1 && confirmaSenha.length < 4) {
                erros.push({ texto: 'Senha é curta, digite senha acima de 5 caracteres' })
            }

            if (senha !== confirmaSenha) {
                erros.push({ texto: 'Senhas são diferentes, tente novamente.' })
            }

        }

        if (perfil === undefined || perfil === null) {
            erros.push({ texto: 'Informe o tipo de perfil' })
        }

        if (erros.length > 0) {
            req.flash('error_msg', erros);
            return res.redirect(`/usuarios/editar/${req.body.id}`);
        } else {
            Usuarios.findOne({
                where: {
                    id: id
                }
            }).then(async (result) => {
                
                if (result !== null) {
                    if (result.dataValues.id !== null || result.dataValues.id !== undefined) {

                        await bcrypt.genSalt(10, async (erro, salt) => {
                            await bcrypt.hash(senha, salt, async (erro, hash) => {
                                if (erro) {
                                    req.flash('error_msg', { texto: "Houve um erro para salvar os dados do usuário" });
                                    return res.redirect(`/usuarios/editar/${id}`);
                                }

                                await Usuarios.update({
                                    nome: nome,
                                    senha: hash,
                                    perfil: perfil
                                },
                                    {
                                        where: {
                                            id: id
                                        }
                                    })
                                    .then((usuario) => {
                                        req.flash('sucess_msg', 'Editado com sucesso');
                                        return res.redirect(`/usuarios/editar/${id}`);
                                        
                                    })
                                    .catch(error => {
                                        req.flash('error_msg', { texto: "Houve um erro, tente novamente" });
                                        return res.redirect(`/usuarios/editar/${id}`);
                                        
                                    });

                            })
                        });
                    }else{
                    
                        await Usuarios.update({
                            nome: nome,
                            perfil: perfil
                        },
                        {
                            where: {
                                id: id
                            }
                        })
                        .then((usuario) => {
                            req.flash('sucess_msg', 'Editado com sucesso');
                            return res.redirect(`/usuarios/editar/${id}`);
                        })
                        .catch(error => {
                            req.flash('error_msg', { texto: "Houve um erro, tente novamente" });
                            return res.redirect(`/usuarios/editar/${id}`);
                        });
                    }

                }else{
                    req.flash('info_msg', "Usuário não encontrado");
                    return res.redirect(`/usuarios/editar/${id}`);

                }

            }).catch((error) => {
                req.flash('error_msg', { texto: "Ocorreu um erro na busca do usuário" });
                res.redirect(`/usuarios/editar/${id}`)
            });

        }


    },

    getUsuarioId: async (req, res) => {
        const { id } = req.params;
        let codigoUsuario = Number.parseInt(id);

        if (Number.isNaN(codigoUsuario)) {
            return res.redirect('/usuarios/?page=1');
        }

        await Usuarios.findOne({
            attributes: ['id', 'nome', 'login', 'perfil'],
            where: {
                id: id
            }
        }).then(usuario => {
            res.render('pages/editarUsuario', {
                id: usuario.id,
                nome: usuario.nome,
                login: usuario.login,
                perfil: usuario.perfil
            });
        }).catch(err => {
            return res.redirect('/usuarios/?page=1');
        });
    },

    excluirUsuario: async (req,res) =>{
        const { id } = req.params;
        let codigoUsuario = Number.parseInt(id);

        if (Number.isNaN(codigoUsuario)) {
            return res.redirect('/usuarios/?page=1');
        }

        let usuarioResult = await Usuarios.findByPk(id);

        if(usuarioResult!==null){
            const result = await Usuarios.destroy({
                where: {
                    id: codigoUsuario
                }
            });
            
            res.status(200).json({sucess:`Usuário(a) ${usuarioResult.login} exclúido com sucesso`});
        }else{
            res.status(404).json({error: "Usuário não encontrato.Tente novamente"});
        }
    }
}