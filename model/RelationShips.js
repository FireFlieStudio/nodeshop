const { Sequelize } = require('sequelize');
const db = require('../common/database')

const RelationShips = db.defineModel('relationships', {
    goodsId: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
    },
    relationId: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
    },
    status:{
        type: Sequelize.BIGINT(20),
        allowNull: false,
    }
});



module.exports = RelationShips