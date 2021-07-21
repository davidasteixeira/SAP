const localStrategy = require('passport-local').Strategy;
const usuarios = require('../models/Usuarios');
const bcrypt = require('bcrypt');


module.exports = function(passport){
    passport.use(new localStrategy({usernameField:'login', passwordField:'senha'}, (login, senha, done)=>{
        usuarios.findOne({
            where: {
                login : login
            }
        }).
        then((usuario)=>{
            //Se a conta não existir vai rodar o código abaixo!
            if(!usuario){
                done(null, false, {message:"Está conta não existe"})
            }

            //Caso o usuario for verdadeiro, vai comparar a senha com bcrypt abaixo.
            bcrypt.compare(senha, usuario.senha, (error, correto)=>{
                if(correto){
                    done(null, usuario);
                }else{
                    console.log("Senha incorreta");
                    done(null,false, {message: "Senha incorreta"});
                }
            })
        }).catch(error=>{
            done(error)
        })
    }))

    passport.serializeUser((usuario, done)=>{
        console.log("Id do usuário:", usuario.id);
        done(null, usuario.id)
    })

    passport.deserializeUser((id, done)=>{
        usuarios.findByPk(id).
        then((usuario)=>{
            done(null, usuario)
        }).
        catch((error)=>{
            done(null, error);
        })
    })
}