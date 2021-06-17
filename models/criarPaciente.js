const db = require('./db');
const {DataTypes} = require('sequelize');
const {Sequelize} = require('./db');

const criarPaciente = db.sequelize.define('Pacientes', {
    Matricula: {
        type:db.Sequelize.STRING
    },
    Atendente: {
        type: db.Sequelize.STRING
    },
    Nome: {
        type: db.Sequelize.STRING
    },
    Nascimento:{
        type:db.Sequelize.STRING
    },
    Telefone:{
        type:db.Sequelize.STRING
    },
    Celular:{
        type:db.Sequelize.STRING
    },
    Especialidade:{
        type:db.Sequelize.STRING
    },
    Observacao:{
        type:db.Sequelize.TEXT
    },
    DataCriacao:{
        type: DataTypes.DATEONLY,
        defaultValue: Sequelize.NOW
    }
})

module.exports = criarPaciente;

//Comando ja executado para criação da tabela
//criarPaciente.sync({force:true})