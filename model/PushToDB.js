const Users = require("../model/Users")
const Tags = require("../model/Tags")
const Comments = require("../model/Comments")
const Goods = require("../model/Goods.js")
const RelationShips = require("../model/RelationShips")
const bcrypt = require('bcryptjs')

function DBinitcial(){
    Users.create({
        userName:"Tomato",
        email:"tomato@tomato.com",
        password:bcrypt.hashSync("password",10),
        status:0
    }).then((res)=>{
        console.log(res)
    })

    Goods.create({
        goodsName:"薯片",
        stock:"100",
        price:"2.5",
        desc:"好吃的薯片"
    })

    Tags.create({
        tagsName:"零食",
        desc:"好吃的零食"
    }).then(console.log)
    Tags.create({
        tagsName:"小吃",
        desc:"好吃的小吃"
    }).then(console.log)

    RelationShips.create({
        goodsID:1,
        relationID:1,
        status:0
    }).then(console.log)
    RelationShips.create({
        goodsID:1,
        relationID:2,
        status:0
    }).then(console.log)
}
// TABLE()
DBinitcial()
function TABLE (){
    Users.sync({force:true})
    Goods.sync({force:true})
    Tags.sync({force:true})
    RelationShips.sync({force:true})
    Comments.sync({force:true})
}
