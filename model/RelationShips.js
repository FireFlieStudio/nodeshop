const { Sequelize } = require('sequelize');
const db = require('../common/database')

const RelationShips = db.defineModel('relationships', {
    goodsID: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
    },
    relationID: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
    },
    status:{
        type: Sequelize.BIGINT(20),
        allowNull: false,
    }
});



module.exports = RelationShips