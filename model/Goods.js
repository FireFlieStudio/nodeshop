const { Sequelize } = require('sequelize');
const db = require('../common/database')

const Goods = db.defineModel('goods', {
    goodsid: {
        type: Sequelize.BIGINT(20),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    goodsname: {
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
    description: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue:""
    },
});

// (async ()=> {
//     Goods.sync({force:true})
// })()


module.exports = Goods