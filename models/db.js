const Sequelize = require('sequelize');

// conexão com o banco de dados MySql
const sequelize = new Sequelize('SAP', 'root', '030596D@vid', {
    host:"localhost",
    dialect: "mysql",
    define: {
        timestamps: false
    }
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}