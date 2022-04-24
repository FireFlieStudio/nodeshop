const Goods = require("../model/Goods")

const db = require("../common/database")
const dto = require("../dto/goods-dto")
const response = require("../response/response")

const controller = {
    async Regist(req,res){
        let body = req.body
        let goods = {
            goodsname:body.goodsname,
            stock:body.stock,
            price:body.price,
            image:body.image,
            description:body.description
        }
        let err = await db.Insert(Goods,goods)
        if (err!=null){
            response(res,500,{err:err.name},"Error")
            return 
        }
        response(res,200,{goods:goods},"商品创建成功")
    },
    async GetGoods(req,res){
        let goods = await Goods.findByPk(req.params.id)
        if (goods){
            response(res,200,{goods:dto(goods)},"")
        }else{
            response(res,200,null,"找不到商品")
        }
    },
    async GetAll(req,res){
        let goods = await Goods.findAll({
            attributes:["goodsid","goodsname","stock","price","image"],
        })
        if (goods){
            response(res,200,{goods:goods},"")
            return
        }
        response(res,422,null,"暂无商品")
    },
    async Update(req,res){
        let body = req.body
        let goodsid = body.goodsid
        let goods = await Goods.findByPk(goodsid)
        if (goods){
            if (body.goodsname){
                goods.goodsname = body.goodsname
            }
            if (body.stock){
                goods.stock = body.stock
            }
            if (body.price){
                goods.price = body.price
            }
            if (body.description){
                goods.description = body.description
            }
            if (body.image){
                goods.image = body.image
            }
            goods.save()
            response(res,200,dto(goods),"修改成功")
        }else{
            response(res,422,null,"找不到商品")
        }
    },
    async Delete(req,res){
        let body = req.body
        let goodsid = body.goodsid
        let goods = await Goods.findByPk(goodsid)
        if (goods){
            const destroy = await Goods.destroy({
                where:{
                    goodsid:goodsid
                }
            })
            response(res,200,dto(goods),"商品删除成功")
            return
        }
        response(res,422,null,"商品删除失败,商品不存在")
    },
}
module.exports = controller