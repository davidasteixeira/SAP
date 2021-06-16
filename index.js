const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const criarPaciente = require('./models/criarPaciente')

//config
    // template Engine
    app.set('view engine', 'ejs')

    //Adicionando arquivos estáticos.. css.. js para rendereizar 
    app.use(express.static(__dirname+'/public'))

//body-parser
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());

//Rotas
app.get('/', function(req, res){
    res.render('pages/inicio')
});

app.get('/pacientes', function(req,res){
    res.render('pages/pacientes')
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