const express = require("express")
const router = express.Router()
const authMiddleWare = require("../middleware/Authrization")
const tags = require("../controller/tags-controller")

router.post("/",authMiddleWare.root,tags.Regist)

router.get("/",tags.GetAll)

router.get("/:id",tags.Get)

router.put("/",authMiddleWare.root,tags.Update)

router.delete("/",authMiddleWare.root,tags.Delete)

module.exports = router