const express = require("express")
const app = express()
const response = require("../response/response")

const push = require("./model/PushToDB")
push()

const userRouter = require("./router/user-router")
const goodsRouter = require("./router/goods-router")
const tagsRouter = require("./router/tags-router")
const relationshipRouter = require("./router/relationships-router")
const commentsRouter = require("./router/comments-router")
// 内置解析中间件
app.use(express.json()) // 解析 application/json
app.use(express.urlencoded({ extended: true })) // 解析 application/x-www-form-urlencoded

// 路由
app.use("/api",userRouter)
app.use("/api/goods",goodsRouter)
app.use("/api/tags",tagsRouter)
app.use("/api/relationships",relationshipRouter)
app.use("/api/comments",commentsRouter)
// 404处理中间件
app.use((req,res,next) => {
    response(res,404,null,"404 Not Found.")
})

// 错误处理中间件
app.use((err,req,res,next) => {
    // console.log("错误",err)
    response(res,500,null,err.messsage)
})

app.listen(8000)