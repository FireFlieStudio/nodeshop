const Tags = require("../model/Tags")

const db = require("../common/database")
const dto = require("../dto/tags-dto")
const response = require("../response/response")

const controller = {
    async Regist(req,res){
        let { tagsName,desc } = req.body
        if (!tagsName||!desc){
            response(res,422,null,"分类创建失败")
            return
        }
        let tagstruct = {
            tagsName:tagsName,
            desc:desc
        }
        let tag = await Tags.findAll({
            where:{
                tagsName:tagsName
            }
        })
        if (tag.length>0){
            response(res,200,null,"分类已被创建")
            return
        }
        try{
            let tags = await Tags.create(tagstruct)
            response(res,200,{tags:dto(tags)},"分类创建成功")
        }catch(err){
            response(res,500,{err:err.name},"Error")
        }
    },
    async Get(req,res){
        let tags = await Tags.findByPk(req.params.id)
        if (tags){
            response(res,200,{tags:dto(tags)},"")
        }else{
            response(res,200,null,"找不到分类")
        }
    },
    async GetAll(req,res){
        let tags = await Tags.findAll()
        if (tags){
            tagscontent = []
            for (let i=0;i<tags.length;i++){
                tagscontent.push(dto(tags[i]))
            }
            response(res,200,{tags:tagscontent},"")
        }else{
            response(res,200,null,"暂无分类")
        }
    },
    async Update(req,res){
        let { tagsID,tagsName,desc } = req.body
        if (!tagsID){
            response(res,422,null,"分类更改失败")
            return
        }
        let tags = await Tags.findByPk(tagsID)
        if (tags){
            if (tagsName){
                tags.tagsName = tagsName
            }
            if (desc){
                tags.desc = desc
            }
            tags.save()
            response(res,200,dto(tags),"")
        }else{
            response(res,422,null,"找不到分类")
        }
    },
    async Delete(req,res){
        let { tagsID } = req.body
        if (!tagsID){
            response(res,422,null,"分类创建失败")
            return
        }
        let tags = await Tags.findByPk(tagsID)
        if (tags){
            const destroy = await Tags.destroy({
                where:{
                    tagsID:tagsID
                }
            })
            response(res,200,dto(tags),"分类删除成功")
            return
        }
        response(res,422,null,"分类删除失败,找不到分类")
    }
}

module.exports = controller