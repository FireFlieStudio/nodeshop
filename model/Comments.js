const { Sequelize } = require('sequelize');
const db = require('../common/database')

const Comments = db.defineModel('comments', {
    commentsid: {
        type: Sequelize.BIGINT(20),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    usersid: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
    },
    desc: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue:"用户没有评价,系统默认好评。"
    },
    star:{
        type: Sequelize.BIGINT(20),
        allowNull: true,
        defaultValue:5
    },
});


module.exports = Comments