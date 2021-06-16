const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const inicio = require('./routes/inicio');
const pacientes = require('./routes/pacientes');

//config
    // template Engine
    app.set('view engine', 'ejs')

    //Adicionando arquivos estáticos.. css.. js para rendereizar 
    app.use(express.static(__dirname+'/public'))

//body-parser
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());

//Rotas
    //Grupo pagina inicial
    app.use('/', inicio);

    //Grupo listagem pacientes
    app.use('/pacientes', pacientes);




app.listen(8081,function(){
    console.log("Servidor rodando na porta 8081, http://localhost:8081");
});