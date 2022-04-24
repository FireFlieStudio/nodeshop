const express = require("express")
const router = express.Router()
const authMiddleWare = require("../middleware/Authrization")
const goods = require("../controller/goods-controller")

router.post("/",authMiddleWare.root,goods.Regist)

router.get("/",goods.GetAll)

router.get("/:id",goods.GetGoods)

router.put("/",authMiddleWare.root,goods.Update)

router.delete("/",authMiddleWare.root,goods.Delete)

module.exports = router