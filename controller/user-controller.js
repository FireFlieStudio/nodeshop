const Users = require("../model/Users")

const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const secret = require("../config/Config").jwtConfig.secret
const db = require("../common/database")
const dto = require("../dto/user-dto")
const response = require("../response/response")

const controller = {
    async Regist(req,res){
        let telephone = body.telephone||0
        let body = req.body
        let user = {
            username:body.username,
            password:bcrypt.hashSync(body.password,10),
            emial:body.emial,
            telephone:telephone
        }
        let err = await db.Insert(Users,user)
        console.log(err)
        if (err!=null){
            if (err =="SequelizeUniqueConstraintError"||err == "SequelizeValidationError"){
                response(res,422,null,"手机号已被占用")
                return 
            }
        }
        response(res,200,{user:dto(user)},"注册成功")
    },
    async Login(req,res){
        let body = req.body
        let emial = body.emial
        let password = body.password
        let user = await Users.findOne({
            where:{
                emial:emial
            }
        })
        if (user){
            if (bcrypt.compareSync(password,user.password)){
                let userid = user.userid
                let token = jwt.sign({userid},secret)
                response(res,200,{token:token},"登录成功")
                return
            }
            response(res,401,null,"登陆失败")
            return
        }
        response(res,401,null,"用户不存在")
    },
    async GetUser(req,res){
        let userid = req.body.userid
        let user = await Users.findByPk(userid)
        response(res,200,{user:dto(user)},"认证成功")
    },
    async GetAll(req,res){
        let users = await Users.findAll({
            attributes:["userid","username","telephone","emial","image","description","status"]
        })
        if (users){
            response(res,200,users,"")
            return
        }
        response(res,200,null,"")
    },
    async Update(req,res){
        let body = req.body
        let userid = req.body.userid
        let user = await Users.findByPk(userid)
        if (body.username){
            user.username = body.username
        }
        if (body.password){
            user.password = bcrypt.hashSync(body.password,10)
        }
        if (body.telephone){
            user.telephone = body.telephone
        }
        if (body.emial){
            user.emial = body.emial
        }
        if (body.image){
            user.image = body.image
        }
        if (body.description){
            user.description = body.description
        }
        user.save()
        response(res,200,dto(user),"修改成功")
    },
    async UpdateUser(req,res){
        let body = req.body
        let userid = req.body.usersid
        let user = await Users.findByPk(userid)
        if (user){
            if (body.username){
                user.username = body.username
            }
            if (body.password){
                user.password = bcrypt.hashSync(body.password,10)
            }
            if (body.telephone){
                user.telephone = body.telephone
            }
            if (body.emial){
                user.emial = body.emial
            }
            if (body.image){
                user.image = body.image
            }
            if (body.description){
                user.description = body.description
            }
            user.save()
            response(res,200,dto(user),"修改成功")
        }else{
            response(res,422,null,"用户不存在")
        }
    },
    async Delete(req,res){
        let userid = req.body.userid
        let user = await Users.findByPk(userid)
        if (user){
            const destroy = await Users.destroy({
                where:{
                    userid:userid
                }
            })
            response(res,200,dto(user),"注销成功")
            return
        }
        response(res,422,null,"注销失败,找不到用户")
    }
}

module.exports = controller