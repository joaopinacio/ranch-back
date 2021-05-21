const {sequelizeConnect, Sequelize} = require('../config/db');
const order = require('./Order.js');
const Item = require('./Item.js');

const ItemInOrder = sequelizeConnect.define("item_order", {

    cdItemPedido: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: "cd_item_pedido"
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "quantidade"
    }, // QUANTIA PARA O ITEM DO PEDIDO 

});

// Creater Item Foreign Key at item Table
Item.hasMany(ItemInOrder);
ItemInOrder.belongsTo(Item);

// Creater Item Foreign Key at order Table
order.hasMany(ItemInOrder);
ItemInOrder.belongsTo(order);

module.exports = ItemInOrder;