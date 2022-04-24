const express = require("express")
const router = express.Router()
const authMiddleWare = require("../middleware/Authrization")
const Relationship = require("../controller/relationship-controller")

router.post("/tags",authMiddleWare.root,Relationship.TagsRegist)

router.get("/",Relationship.GetAll)

router.delete("/",authMiddleWare.root,Relationship.Delete)

module.exports = router