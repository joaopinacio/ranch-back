const {sequelizeConnect, Sequelize} = require('../config/db');
const User = require('./User');

const Address = sequelizeConnect.define('address', {
    cdEndereco: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: "cd_endereco"
    },
    logradouro: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "logradouro"
    },
    numero: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "numero"
    },
    complemento: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "complemento"
    },
    bairro: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "bairro"
    },
    cidade: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "cidade"
    },
    estado: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "estado"
    }
});

// Creater Address Foreign Key at User Table
User.hasMany(Address);
Address.belongsTo(User);

module.exports = Address;