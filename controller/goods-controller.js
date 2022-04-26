const Goods = require("../model/Goods")

const db = require("../common/database")
const dto = require("../dto/goods-dto")
const response = require("../response/response")

const controller = {
    async Regist(req,res){
        let { goodsName,stock,price } = req.body
        let image = req.body.image||""
        let desc = req.body.desc||""
        if (!goodsName||!stock||!price){
            response(res,244,null,"注册商品失败")
            return
        }
        let goods = {
            goodsName:goodsName,
            stock:stock,
            price:price,
            image:image,
            desc:desc
        }
        let err = await db.Insert(Goods,goods)
        if (err!=null){
            response(res,500,{err:err},"Error")
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
            attributes:["goodsId","goodsName","stock","price","image"],
        })
        if (goods){
            response(res,200,{goods:goods},"")
            return
        }
        response(res,422,null,"暂无商品")
    },
    async Update(req,res){
        let { goodsId,goodsName,stock,price,image,desc } = req.body
        let goods = await Goods.findByPk(goodsId)
        if (goods){
            if (goodsName){
                goods.goodsName = goodsName
            }
            if (stock){
                goods.stock = stock
            }
            if (price){
                goods.price = price
            }
            if (image){
                goods.image = image
            }
            if (desc){
                goods.desc = desc
            }
            goods.save()
            response(res,200,dto(goods),"修改成功")
        }else{
            response(res,422,null,"找不到商品")
        }
    },
    async Delete(req,res){
        let { goodsId } = req.body
        let goods = await Goods.findByPk(goodsId)
        if (goods){
            const destroy = await Goods.destroy({
                where:{
                    goodsId:goodsId
                }
            })
            response(res,200,dto(goods),"商品删除成功")
            return
        }
        response(res,422,null,"商品删除失败,商品不存在")
    },
}
module.exports = controller