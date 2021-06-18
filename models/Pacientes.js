const db = require('./db');
const {DataTypes} = require('sequelize');
const {Sequelize} = require('./db');

const Pacientes = db.sequelize.define('Pacientes', {
    Status:{
        type: db.Sequelize.ENUM(['AGUARDANDO','FINALIZADO','SEM CONTATO','DELETADO']),
        defaultValue: "AGUARDANDO",
        allowNull: false
    },
    Matricula: {
        type:db.Sequelize.STRING,
        allowNull: false
    },
    Atendente: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    Nome: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    Nascimento:{
        type:db.Sequelize.STRING,
        allowNull: false
    },
    Telefone:{
        type:db.Sequelize.STRING,
        allowNull: false
    },
    Celular:{
        type:db.Sequelize.STRING,
        allowNull: false
    },
    Especialidade:{
        type:db.Sequelize.STRING,
        allowNull: false
    },
    Observacao:{
        type:db.Sequelize.TEXT,
        allowNull: false
    },
    DataCriacao:{
        type: DataTypes.DATEONLY,
        defaultValue: Sequelize.NOW,
        allowNull: false
    }
})

module.exports = Pacientes;

//Comando ja executado para criação da tabela
//Pacientes.sync({force:true})