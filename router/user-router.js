const express = require("express")
const router = express.Router()
const authMiddleWare = require("../middleware/Authrization")
const user = require("../controller/user-controller")


router.post("/regist",user.Regist)

router.post("/login",user.Login)

router.get("/",authMiddleWare.user,user.GetUser)

router.get("/users",authMiddleWare.root,user.GetAll)

router.put("/",authMiddleWare.user,user.Update)
router.put("/user",authMiddleWare.root,user.UpdateUser)

router.delete("/",authMiddleWare.user,user.Delete)

module.exports = router