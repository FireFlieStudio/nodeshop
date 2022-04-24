const Tags = require("../model/Tags")

const db = require("../common/database")
const dto = require("../dto/tags-dto")
const response = require("../response/response")

const controller = {
    async Regist(req,res){
        let body = req.body
        let tags = {
            tagsname:body.tagsname,
            description:body.description
        }
        let err = await db.Insert(Tags,tags)
        if (err!=null){
            if (err=="SequelizeUniqueConstraintError"){
                response(res,200,{tags:dto(tags)},"分类创建成功")
                return
            }
            response(res,500,{err:err},"Error")
            return 
        }
        response(res,200,{tags:dto(tags)},"分类创建成功")
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
            response(res,200,{tags:tags},"")
        }else{
            response(res,200,null,"暂无分类")
        }
    },
    async Update(req,res){
        let body = req.body
        let tagsid = body.tagsid
        let tags = await Tags.findByPk(tagsid)
        if (tags){
            if (body.tagsname){
                tags.tagsname = body.tagsname
            }
            if (body.description){
                tags.description = body.description
            }
            tags.save()
            response(res,200,dto(tags),"")
        }else{
            response(res,422,null,"找不到分类")
        }
    },
    async Delete(req,res){
        let body = req.body
        let tagsid = body.tagsid
        let tags = await Tags.findByPk(tagsid)
        if (tags){
            const destroy = await Tags.destroy({
                where:{
                    tagsid:tagsid
                }
            })
            response(res,200,dto(tags),"分类删除成功")
            return
        }
        response(res,422,null,"分类删除失败,找不到分类")
    }
}

module.exports = controller