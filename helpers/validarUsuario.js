module.exports = {
    validarUsuario :(req,res, next)=>{
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/login");
    },
    validarAdmin : (req,res, next)=>{
        if(req.isAuthenticated() && req.user.perfil ==="ADMIN"){
            return next();
        }

        req.flash('error_msg',"Perfil não autorizado a registrar usuário");
        res.redirect('/')
        
    }
}

