const db = require("../config/Config").sqlConfig
const Sequelize = require("sequelize")

const sequelize = new Sequelize(db.database, db.user, db.password, {
    logging: sql => {
        // logger
        if(db.debug){
            console.log(sql)
        }
    },
    port:db.port,
    host: db.host,
    dialect: 'mysql',
    dialectOptions: {
        dateStrings: true,
        typeCast: true
    },
    pool: {
        max: 20,
        min: 1,
        acquire: 60000,
        idle: 10000
    },
    timezone: '+08:00' //东八时区
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err.message)
})


const handle = {
    /*
        CRUD
    */
    async Insert(model,args) {
        return model.create(args)
        .then(() => {
            // console.log("Succ")
            return null
        })
        .catch(err => {
            // console.log("Fail")
            return err.name
        })
    },
    /* 
        自定义模型构造方法
        自动插入 createAt updateAt status
    */
    defineModel(name, attributes){
        var attrs = {}
    
        for (let key in attributes) {
            let value = attributes[key]
            if (typeof value === 'object' && value['type']) {
                value.allowNull = value.allowNull || false
                attrs[key] = value
            } else {
                attrs[key] = {
                    type: value,
                    allowNull: false
                }
            }
        }
    
        // 附加公共字段
        attrs.createAt = {
            type: Sequelize.BIGINT,
            allowNull: false
        }
        attrs.updateAt = {
            type: Sequelize.BIGINT,
            allowNull: false
        }
    
        // 调用seq的方法定义模型并返回
        return sequelize.define(name, attrs, {
            tableName: name,
            timestamps: false,
            hooks: {
                beforeValidate: function (obj) {
                    let now = Date.now()
                    if (obj.isNewRecord) {
                        obj.createAt = now
                        obj.updateAt = now
                        // obj.version = 0
                    } else {
                        obj.updateAt = now
                        // ++obj.version
                    }
                }
            }
        })
    }
}

module.exports = handle