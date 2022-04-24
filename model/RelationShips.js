const { Sequelize } = require('sequelize');
const db = require('../common/database')

const RelationShips = db.defineModel('relationships', {
    goodsid: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
    },
    tagsid: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
    },
});

(async ()=> {
    RelationShips.sync({force:true})
})()

module.exports = RelationShips