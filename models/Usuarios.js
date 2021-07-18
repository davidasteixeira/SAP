const { Sequelize } = require('./db');
const db = require('./db');


const Usuarios = db.sequelize.define('Usuarios',{
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [2,150]
        }
    },
    login:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            len: [2,50],
            notEmpty: true
        }
    },
    senha:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty:true,
            len:[5,100]
        }
    },
    perfil:{
        type: Sequelize.ENUM(["ATIVO","RECEPTIVO","ADMIN"]),
        defaultValue:"RECEPTIVO",
        allowNull:false,
        validate:{
            notEmpty:true
        }
    }
});

module.exports = Usuarios;

Usuarios.sync({alter:true});