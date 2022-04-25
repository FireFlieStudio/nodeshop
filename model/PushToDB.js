const Users = require("../model/Users")
const Tags = require("../model/Tags")
const Comments = require("../model/Comments")
const Goods = require("../model/Goods.js")
const RelationShips = require("../model/RelationShips")



module.exports = () => {
    Users.sync()//{force:true})
    Goods.sync({force:true})
    Tags.sync({force:true})
    RelationShips.sync({force:true})
    Comments.sync({force:true})
}
