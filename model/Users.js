const { Sequelize } = require('sequelize');
const db = require('../common/database');
const { root } = require('../middleware/Authrization');

const Users = db.defineModel('users', {
    userid: {
        type: Sequelize.BIGINT(20),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    telephone: {
        type: Sequelize.STRING(11),
        allowNull: true,
    },
    emial: {
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING(255),
        allowNull: true,
        // defaultValue:""
    },
    description: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue:"这个人很懒,什么都没有写awa..."
    },
    // 状态：1表示有效，2表示无效，0表示root，默认为1.
    status : {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
});

// (async ()=> {
//     Users.sync()//{force:true})
// })()

module.exports = Users