const User = require("../model/Users")
const jwt = require("jsonwebtoken")
const secret = require("../config/Config").jwtConfig.secret
const response = require("../response/response")
module.exports = {
    async user(req,res,next){
        try{
            let token = req.headers.authorization.split(' ')[1]
            let decoded = jwt.verify(token,secret)
            let userID = decoded.userID
            let user = await User.findByPk(userID)
            if (user){
                req.body.userID = userID
                next()
            }else{
                response(res,401,null,"用户不存在")
            }
        }catch(err){
            response(res,401,null,"认证失败")
        }
    },
    async root(req,res,next){
        try{
            let token = req.headers.authorization.split(' ')[1]
            let decoded = jwt.verify(token,secret)
            let userID = decoded.userID
            let user = await User.findByPk(userID)
            if (user){
                if (user.status==0){
                    req.body.userID = userID
                    next()
                }else{
                    response(res,401,null,"权限不足")
                }
            }else{
                response(res,401,null,"用户不存在")
            }
        }catch(err){
            response(res,401,null,"认证失败")
        }
    },
}