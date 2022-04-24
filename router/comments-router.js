const express = require("express")
const router = express.Router()
const authMiddleWare = require("../middleware/Authrization")
const comments = require("../controller/comments-controller")

router.post("/",authMiddleWare.user,comments.Post)

router.delete("/",authMiddleWare.user,comments.Delete)

module.exports = router