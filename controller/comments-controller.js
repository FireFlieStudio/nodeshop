const Comments = require("../model/Comments")
const RelationShips = require("../model/RelationShips")
const db = require("../common/database")
const response = require("../response/response")
const Users = require("../model/Users")


/*
    status:
        0   =>  tags
        1   =>  comments
*/

const controller = {
    async Post(req,res,next){
        let { goodsID,userID,desc,star } = req.body
        if (!goodsID||!userID||!desc||!star){
            response(res,422,null,"评论发布失败")
            return
        }
        commentstruct = {userID:userID,desc:desc,star:star}
        let comment = await Comments.create(commentstruct)
        let err = await db.Insert(RelationShips,{
            goodsID:goodsID,
            relationID:comment.dataValues.commentsID,
            status:1
        })
        if (err!=null){
            response(res,422,null,"评论发布失败")
            return
        }
        response(res,200,{comments:commentstruct},"评论发布成功")
    },
    async Delete(req,res){
        let { commentsID,userID } = req.body
        if (!commentsID||!userID){
            response(res,422,null,"评论删除失败")
            return
        }
        let comment = await Comments.findByPk(commentsID)
        if (comment){
            let user = await Users.findByPk(userID)
            if (user.userID==comment.userID){ 
                let destroy = await Comments.destroy({
                    where:{
                        commentsID:commentsID
                    }
                })
                response(res,200,{comment:comment},"评论删除成功")
                return
            }else{
                response(res,401,null,"用户认证失败")
                return
            }
        }
        response(res,422,null,"评论删除失败,评论不存在")
    }
}

module.exports = controller