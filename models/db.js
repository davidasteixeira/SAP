require ( 'dotenv' ).config()
const Sequelize = require('sequelize');

// conexão com o banco de dados MySql
const sequelize = new Sequelize(process.env.bd_dados, process.env.bd_user, process.env.bd_pass, {
    host: process.env.bd_host,
    dialect: "mysql",
    timezone: '-03:00'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}