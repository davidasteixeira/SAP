const db = require('./db');
const {DataTypes} = require('sequelize');
const {Sequelize} = require('./db');

const Pacientes = db.sequelize.define('Pacientes', {
    DataCriacao:{
        type: DataTypes.DATEONLY,
        defaultValue: Sequelize.NOW,
        allowNull:false,
        validate:{
            notEmpty: true
        }
    },
    Status:{
        type: db.Sequelize.ENUM(['AGUARDANDO','RESOLVIDO','FECHADO','DELETADO']),
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
            notEmpty: true,
        }
    },
    Nome: {
        type: db.Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty: true,
            len: [5,70]
        }
    },
    Nascimento:{
        type:db.Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty: true,
            len: [10,10]
        }
    },
    Idade:{
        type:db.Sequelize.INTEGER,
        allowNull:false,
        validate:{
            notEmpty: true,
        }
    },
    Telefone:{
        type:db.Sequelize.STRING,
        allowNull:true,
        validate:{
            notEmpty: true,
            len: [12,12]
        }
    },
    Celular:{
        type:db.Sequelize.STRING,
        allowNull:true,
        validate:{
            notEmpty: true,
            len: [13,13]
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
            len: [5,70],
            notEmpty: true
        }
    },
    AtendenteRegistro:{
        type: db.Sequelize.STRING
    },
    informacaoRegistro:{
        type: db.Sequelize.STRING
    }
})

module.exports = Pacientes;

Pacientes.sync({alter:true})