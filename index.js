const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const inicio = require('./routes/inicio');
const pacientes = require('./routes/pacientes');
const login = require('./routes/login');
const registro = require('./routes/registro');
const session = require('express-session');
const flash = require('connect-flash');

//config
    // template Engine
    app.set('view engine', 'ejs')

    //Adicionando arquivos estáticos.. css.. js para rendereizar 
    app.use(express.static(__dirname+'/public'))

    //Sessão
    app.use(session({
        secret: "cemeru@123",
        resave: true,
        saveUninitialized:true
    }));
    app.use(flash());

//Midleware
    app.use((req,res,next)=>{
        res.locals.sucess_msg = req.flash("sucess_msg");
        res.locals.error_msg = req.flash("error_msg");
        next();
    })

//body-parser
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());

//Rotas
    //Grupo pagina inicial
    app.use('/', inicio);

    //Grupo listagem pacientes
    app.use('/pacientes', pacientes);

    //Grupo pagina login
    app.use('/login', login);

    //Grupo de registro de usuarios
    app.use('/registro', registro);



app.listen(8081,function(){
    console.log("Servidor rodando na porta 8081, http://localhost:8081");
});