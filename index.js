require('dotenv').config();
const express = require('express')
const app = express();
const inicio = require('./routes/inicio');
const pacientes = require('./routes/pacientes');
const login = require('./routes/login');
const registro = require('./routes/registro');
const logout = require('./routes/logout');
const relatorios = require('./routes/relatorios');
const usuarios = require('./routes/usuarios');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
require('./config/auth')(passport);
const {dataFormatada, horaFormatada} = require('./public/js/Validation/Validacao');
const path = require("path");
const cors = require('cors');
//config
    // template Engine
    app.set('view engine', 'ejs')

    //Adicionando arquivos estáticos.. css.. js para rendereizar 
    app.use(express.static(__dirname+'/public'))

    //Apontando a pasta Views, dessa forma no sistema Ubuntu o Nginx consegue buscar as páginas.
    app.set("views", path.join(__dirname, "Views"));

    //Sessão
    app.use(session({
        secret: `${process.env.secrect_session}`,
        resave: true,
        saveUninitialized:true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

//Midleware
    app.use((req,res,next)=>{
        res.locals.sucess_msg = req.flash("sucess_msg");
        res.locals.error_msg = req.flash("error_msg");
        res.locals.info_msg = req.flash("info_msg");
        res.locals.error = req.flash("error");
        res.locals.sucess = req.flash("sucess");
        res.locals.user = req.user || null;
        res.locals.paginaAtual = req.query.page || null;
        next();
    })
//Funções para utilizar na renderização
    app.locals.dataFormatada = dataFormatada;
    app.locals.horaFormatada = horaFormatada;

//Converter requisições
    app.use(express.urlencoded({extended:false}));
    app.use(express.json());
    app.use(cors())

//Rotas
    //Grupo pagina inicial
    app.use('/', inicio);

    //Grupo listagem pacientes
    app.use('/pacientes', pacientes);

    //Grupo pagina login
    app.use('/login', login);

    //Grupo de registro de usuarios
    app.use('/registro', registro);

    //Grupo de logout/sair do usuario
    app.use('/logout', logout )

    //Grupo de relatorios no banco
    app.use('/relatorios', relatorios)

    //Grupo de usuários
    app.use('/usuarios', usuarios);


app.listen(process.env.server_port,function(){
    console.log(`Servidor rodando na porta ${process.env.server_port}, http://${process.env.bd_host}:${process.env.server_port}`);
});