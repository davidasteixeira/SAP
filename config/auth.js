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
            
            if(!usuario){
                done(null, false, {message:"Está conta não existe"})
            }

            
            bcrypt.compare(senha, usuario.senha, (error, correto)=>{
                if(correto){
                    done(null, usuario);
                }else{
                    done(null,false, {message: "Senha incorreta"});
                }
            })
        }).catch(error=>{
            done(error)
        })
    }))

    passport.serializeUser((usuario, done)=>{
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