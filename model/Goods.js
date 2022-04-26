const { Sequelize } = require('sequelize');
const db = require('../common/database')

const Goods = db.defineModel('goods', {
    goodsId: {
        type: Sequelize.BIGINT(20),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    goodsName: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    stock:{
        type: Sequelize.BIGINT(20),
        allowNull: false
    },
    price:{
        type: Sequelize.STRING(255),
        allowNull: false
    },
    image: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue:""
    },
    desc: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue:""
    },
});




module.exports = Goods