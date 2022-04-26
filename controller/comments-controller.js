const Comments = require("../model/Comments")
const db = require("../common/database")
const response = require("../response/response")

const controller = {
    async Post(req,res){
        let { userId,desc,star } = req.body
        let comments = {
            userId:userId,
            desc:desc,
            star:star
        }
        let err = await db.Insert(Comments,comments)
        if (err!=null){
            if (err=="SequelizeUniqueConstraintError"){
                response(res,200,{comments:comments},"评论发布成功")
                return
            }
            response(res,500,{err:err},"Error")
            return 
        }
        response(res,200,{comments:comments},"评论发布成功")
    },
    async Delete(req,res){
        let { commentsId } = req.body
        let comments = await Comments.findByPk(commentsId)
        if (comments){
            const destroy = await Comments.destroy({
                where:{
                    commentsId:commentsId
                }
            })
            response(res,200,{comments:comments},"评论删除成功")
            return
        }
        response(res,422,null,"评论删除失败,评论不存在")
    }
}

module.exports = controller