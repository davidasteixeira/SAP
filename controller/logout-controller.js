

exports.sairDoUsuario = (req, res)=>{

    req.logout();
    req.session = null;
    res.locals.user = null;

    res.redirect('/login');

}