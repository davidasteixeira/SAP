const passport = require('passport');


exports.AutenticarUsuario = (req, res, next)=>{
    passport.authenticate("local", function(error, user, info){
        if(error){ 
            return next(error)
        }
        if(!user){
            return res.render("pages/login", {message : info.message})
        }
        req.logIn(user, function(error){
            if(error){ 
                return next(error); 
            }
            return res.redirect("/");
        })
    })(req, res, next)
}

