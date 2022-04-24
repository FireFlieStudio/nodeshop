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
        let body = req.body
        let relationships = {
            goodsid:body.goodsid,
            relationid:body.tagsid,
            status:0
        }
        let ret = await RelationShips.findAll({
            where:{
                goodsid:relationships.goodsid,
                relationid:relationships.relationid
            }
        })
        if (ret.length>0){
            response(res,200,null,"关系已被占用")
            return
        }
        let goods = await Goods.findByPk(relationships.goodsid)
        if (goods){
            let tags = await Tags.findByPk(relationships.relationid)
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
        let body = req.body
        let relationships = {
            goodsid:body.goodsid,
            relationid:body.commentsid,
            status:1
        }
        let ret = await RelationShips.findAll({
            where:{
                goodsid:relationships.goodsid,
            }
        })
        if (ret.length>0){
            response(res,200,null,"关系已被占用")
            return
        }
        let goods = await Goods.findByPk(relationships.goodsid)
        if (goods){
            let tags = await Tags.findByPk(relationships.relationid)
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
    async GetAll(req,res){
        let body = req.body
        let goodsid = body.goodsid
        let tags = await RelationShips.findAll({
            where:{
                goodsid:goodsid
            }
        })
        let content = {}
        let goods = await Goods.findByPk(goodsid)
        if (goods){
            if (tags.length>0){    
                content.goods = Goodsdto(goods)
                tagscontent = []
                for (let i=0;i<tags.length;i++){
                    let tag = await Tags.findByPk(tags[i].relationid)
                    if (tag){
                        tagscontent.push(Tagsdto(tag))
                    }
                }
                content.tags = tagscontent
                response(res,200,content,"关系查询成功")
                return
            }
            response(res,422,null,"找不到关系")
            return
        }
        response(res,422,null,"找不到关系")
    },
    async Delete(req,res){
        let body = req.body
        let goodsid = body.goodsid
        let goods = await Goods.findByPk(goodsid)
        if (goods){
            let destroy = await RelationShips.destroy({
                where:{
                    goodsid:goodsid
                }
            })
            response(res,200,null,"关系删除成功")
            return
        }
        response(res,422,null,"关系删除失败,找不到关系")
    }
}

module.exports = controller