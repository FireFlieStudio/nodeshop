const Tags = require("../model/Tags")
const Comments = require("../model/Comments")
const Goods = require("../model/Goods.js")
const RelationShips = require("../model/RelationShips")
const Tagsdto = require("../dto/tags-dto")
const Goodsdto = require("../dto/goods-dto")
const db = require("../common/database")
const response = require("../response/response")

/*
    status:
        0   =>  tags
        1   =>  comments
*/

const controller = {
    async TagsRegist(req,res){
        let { goodsID,tagsID } = req.body
        if (!goodsID||!tagsID){
            response(res,422,null,"关系注册失败")
            return
        }
        let relationships = {
            goodsID:goodsID,
            relationID:tagsID,
            status:0
        }
        let ret = await RelationShips.findAll({
            where:{
                goodsID:relationships.goodsID,
                relationID:relationships.relationID
            }
        })
        if (ret.length>0){
            response(res,422,null,"关系已被占用")
            return
        }
        let goods = await Goods.findByPk(relationships.goodsID)
        if (goods){
            let tags = await Tags.findByPk(relationships.relationID)
            if (tags){
                let err = await db.Insert(RelationShips,relationships)
                if (err!=null){
                    response(res,500,{err:err},"Error")
                    return 
                }
                relationships.tags = Tagsdto(tags)
                relationships.goods = Goodsdto(goods)
                response(res,200,{relationships:relationships},"关系创建成功")
                return
            }
            response(res,200,null,"关系创建失败,找不到分类")
            return
        }
        response(res,200,null,"关系创建失败,找不到商品")
    },
    async CommentsRegist(req,res){
        //未完工
    },
    async GetAll(req,res){
        let { goodsID } = req.body
        if (!goodsID){
            response(res,422,null,"关系获取失败")
            return
        }
        let tags = await RelationShips.findAll({
            where:{
                goodsID:goodsID
            }
        })
        let content = {}
        let goods = await Goods.findByPk(goodsID)
        if (!goods){
            response(res,422,null,"找不到关系")
            return
        }
        if (!(tags.length>0)){
            response(res,422,null,"找不到关系")
            return
        }
        content.goods = Goodsdto(goods)
        tagsContent = []
        for (let i=0;i<tags.length;i++){
            let tag = await Tags.findByPk(tags[i].relationID)
            if (tag){
                tagsContent.push(Tagsdto(tag))
            }
        }
        content.tags = tagsContent
        response(res,200,content,"关系查询成功")
        return
    },
    async Delete(req,res){
        let { goodsID } = req.body
        if (!goodsID){
            response(res,422,null,"关系删除失败")
            return
        }
        let goods = await Goods.findByPk(goodsID)
        if (goods){
            let destroy = await RelationShips.destroy({
                where:{
                    goodsID:goodsID
                }
            })
            response(res,200,null,"关系删除成功")
            return
        }
        response(res,422,null,"关系删除失败,找不到关系")
    }
}

module.exports = controller