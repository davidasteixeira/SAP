

exports.sairDoUsuario = (req, res)=>{

    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.session.destroy();
        req.session = null;
        res.locals.user = null;
        res.redirect('/login');
    });

}