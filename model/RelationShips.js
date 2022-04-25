const { Sequelize } = require('sequelize');
const db = require('../common/database')

const RelationShips = db.defineModel('relationships', {
    goodsid: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
    },
    relationid: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
    },
    status:{
        type: Sequelize.BIGINT(20),
        allowNull: false,
    }
});



module.exports = RelationShips