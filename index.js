const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars');
const criarPaciente = require('./models/criarPaciente')

//config
    // template Engine
    app.engine('handlebars', handlebars({extname:'handlebars',defaultLayout:'main',
    layoutsDir:__dirname+'/Views/layouts/'}))
    app.set('view engine', 'handlebars')
    app.use(express.static(__dirname+'/public'))

//body-parser
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());

//Rotas
app.get('/', function(req, res){
    res.render('layouts/main')
});

app.get('/pacientes', function(req,res){
    res.render('pacientes')
});

app.post('/enviado', (req,res)=>{
    criarPaciente.create({
      Observacao: req.body.observacao,
      Nome: req.body.nome,
      Atendente: req.body.atendente,
      Matricula: req.body.matricula,
      Nascimento: req.body.nascimento,
      Telefone: req.body.telefone,
      Celular: req.body.celular,
      Especialidade: req.body.especialidade
    }).then(()=>{
        res.redirect('/')
    }).catch(erro=>{
        res.send('Houve um erro: '+ erro)
    })
});



app.listen(8081,function(){
    console.log("Servidor rodando na porta 8081, http://localhost:8081");
});