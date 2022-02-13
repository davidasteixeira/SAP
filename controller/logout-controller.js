

exports.sairDoUsuario = (req, res)=>{

    req.logout();
    req.session.destroy();
    req.session = null;
    res.locals.user = null;

    res.redirect('/login');

}