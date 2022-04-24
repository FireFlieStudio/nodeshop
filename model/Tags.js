const { Sequelize } = require('sequelize');
const db = require('../common/database')

const Tags = db.defineModel('tags', {
    tagsid: {
        type: Sequelize.BIGINT(20),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    tagsname: {
        type: Sequelize.STRING(255),
        unique: true,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
});

(async ()=> {
    Tags.sync({force:true})
})()

module.exports = Tags