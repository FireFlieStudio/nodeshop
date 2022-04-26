const { Sequelize } = require('sequelize');
const db = require('../common/database')

const Books = db.defineModel('books', {
    booksId: {
        type: Sequelize.BIGINT(20),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    userID:{
        type: Sequelize.BIGINT(20),
        allowNull: false
    },
    count:{
        type: Sequelize.BIGINT(20),
        allowNull: false
    },
    addr: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    status:{
        type: Sequelize.BIGINT(20),
        allowNull: true,
        defaultValue:0      //0未付款 1已付款 2已发货 3已到货 4已签收 5已评价
    },
});

(async ()=> {
    Books.sync({force:true})
})()

module.exports = Books