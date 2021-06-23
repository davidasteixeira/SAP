const db = require('./db');
const {DataTypes} = require('sequelize');
const {Sequelize} = require('./db');

const Pacientes = db.sequelize.define('Pacientes', {
    Status:{
        type: db.Sequelize.ENUM(['AGUARDANDO','FINALIZADO','SEM CONTATO','DELETADO']),
        defaultValue: "AGUARDANDO",
        allowNull:false,
        validate:{
            isUppercase: true,
            notEmpty: true
        }
    },
    Matricula: {
        type:db.Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty: true,
            len: [8,8]
        }
    },
    Atendente: {
        type: db.Sequelize.STRING,
        allowNull:false,
        validate:{
            isAlpha: true,
            notEmpty: true,
        }
    },
    Nome: {
        type: db.Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty: true,
        }
    },
    Nascimento:{
        type:db.Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty: true
        }
    },
    Telefone:{
        type:db.Sequelize.STRING,
        allowNull:true,
        validate:{
            notEmpty: true
        }
    },
    Celular:{
        type:db.Sequelize.STRING,
        allowNull:true,
        validate:{
            notEmpty: true,
        }
    },
    Especialidade:{
        type:db.Sequelize.STRING,
        allowNull:false,
    },
    Observacao:{
        type:db.Sequelize.TEXT,
        allowNull:false,
        validate:{
            len: [5,45],
            notEmpty: true
        }
    },
    DataCriacao:{
        type: DataTypes.DATEONLY,
        defaultValue: Sequelize.NOW,
        allowNull:false,
        validate:{
            notEmpty: true
        }
    }
})

module.exports = Pacientes;

//Comando ja executado para criação da tabela
Pacientes.sync({alter:true})