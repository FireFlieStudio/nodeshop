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
            response(res,422,null,"注册商品失败")
            return
        }
        let goodstruct = {
            goodsName:goodsName,
            stock:stock,
            price:price,
            image:image,
            desc:desc
        }
        try{
            let goods = await Goods.create(goodstruct)
            response(res,200,{goods:dto(goods.dataValues)},"商品创建成功")
        }catch(err){
            response(res,500,{err:err},"Error")
        }
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
        let goods = await Goods.findAll()
        if (goods){
            goodscontent = []
            for (let i=0;i<goods.length;i++){
                goodscontent.push(dto(goods[i]))
            }
            response(res,200,{goods:goodscontent},"")
            return
        }
        response(res,422,null,"暂无商品")
    },
    async Update(req,res){
        let { goodsID,goodsName,stock,price,image,desc } = req.body
        let goods = await Goods.findByPk(goodsID)
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
        let { goodsID } = req.body
        let goods = await Goods.findByPk(goodsID)
        if (goods){
            const destroy = await Goods.destroy({
                where:{
                    goodsID:goodsID
                }
            })
            response(res,200,dto(goods),"商品删除成功")
            return
        }
        response(res,422,null,"商品删除失败,商品不存在")
    },
}
module.exports = controller