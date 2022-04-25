const Users = require("../model/Users")

const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const secret = require("../config/Config").jwtConfig.secret
const db = require("../common/database")
const dto = require("../dto/user-dto")
const response = require("../response/response")

const controller = {
    async Regist(req,res){
        let telephone = req.body.telephone||0
        let { username,password,emial } = req.body
        if (!username||!password||!emial){
            if (!username||!emial||!password){
                response(res,244,null,"注册失败")
                return
            }
        }
        let user = {
            username:username,
            password:bcrypt.hashSync(password,10),
            emial:emial,
            telephone:telephone
        }
        let err = await db.Insert(Users,user)
        if (err!=null){
            if (err =="SequelizeUniqueConstraintError"||err == "SequelizeValidationError"){
                response(res,422,null,"手机号已被占用")
                return 
            }
        }
        response(res,200,{user:dto(user)},"注册成功")
    },
    async Login(req,res){
        let { emial,password } = req.body
        if (!emial||!password){
            response(res,422,null,"登陆失败")
            return
        }
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
        let { userid } = req.body
        let user = await Users.findByPk(userid)
        response(res,200,{user:dto(user)},"认证成功")
    },
    async GetAll(req,res){
        let users = await Users.findAll({
            attributes:["userid","username","telephone","emial","image","desc","status"]
        })
        if (users){
            response(res,200,users,"")
            return
        }
        response(res,200,null,"")
    },
    async Update(req,res){
        let { userid,username,password,telephone,emial,image,desc } = req.body
        let user = await Users.findByPk(userid)
        if (username){
            user.username = username
        }
        if (password){
            user.password = bcrypt.hashSync(password,10)
        }
        if (telephone){
            user.telephone = telephone
        }
        if (emial){
            user.emial = emial
        }
        if (image){
            user.image = image
        }
        if (desc){
            user.desc = desc
        }
        user.save()
        response(res,200,dto(user),"修改成功")
    },
    async UpdateUser(req,res){
        let { usersid,username,password,telephone,emial,image,desc } = req.body
        let user = await Users.findByPk(usersid)
        if (user){
            if (username){
                user.username = username
            }
            if (password){
                user.password = bcrypt.hashSync(password,10)
            }
            if (telephone){
                user.telephone = telephone
            }
            if (emial){
                user.emial = emial
            }
            if (image){
                user.image = image
            }
            if (desc){
                user.desc = desc
            }
            user.save()
            response(res,200,dto(user),"修改成功")
        }else{
            response(res,422,null,"用户不存在")
        }
    },
    async Delete(req,res){
        let { userid } = req.body
        if (!userid){
            response(res,422,null,"用户删除失败")
            return
        }
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