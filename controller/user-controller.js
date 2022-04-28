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
        let image = req.body.image||""
        let desc = req.body.desc||"这个人很懒,什么都没有写awa..."
        let { userName,password,email } = req.body
        if (!userName||!password||!email){
            if (!userName||!email||!password){
                response(res,422,null,"注册失败")
                return
            }
        }
        let userstruct = {
            userName:userName,
            password:bcrypt.hashSync(password,10),
            email:email,
            telephone:telephone,
            image:image,
            desc:desc
        }
        try{
            let user = await Users.create(userstruct)
            response(res,200,{user:dto(user)},"注册成功")
        }catch(e){
            let err = e.name
            if (err!=null){
                if (err =="SequelizeUniqueConstraintError"||err == "SequelizeValidationError"){
                    response(res,422,null,"邮箱已被占用")
                    return 
                }
            }
        }
       
    },
    async Login(req,res){
        let { email,password } = req.body
        if (!email||!password){
            response(res,422,null,"登陆失败")
            return
        }
        let user = await Users.findOne({
            where:{
                email:email
            }
        })
        if (user){
            if (bcrypt.compareSync(password,user.password)){
                let userID = user.userID
                let token = jwt.sign({userID},secret)
                response(res,200,{token:token},"登录成功")
                return
            }
            response(res,401,null,"登陆失败")
            return
        }
        response(res,401,null,"用户不存在")
    },
    async GetUser(req,res){
        let userID = req.body.userID
        let user = await Users.findByPk(userID)
        response(res,200,{user:dto(user)},"认证成功")
    },
    async GetAll(req,res){
        let users = await Users.findAll()
        if (users){
            userscontent = []
            for (let i=0;i<users.length;i++){
                userscontent.push(dto(users[i]))
            }
            response(res,200,{users:userscontent},"")
            return
        }
        response(res,200,null,"")
    },
    async Update(req,res){
        let { userID,userName,password,telephone,email,image,desc } = req.body
        let user = await Users.findByPk(userID)
        if (userName){
            user.userName = userName
        }
        if (password){
            user.password = bcrypt.hashSync(password,10)
        }
        if (telephone){
            user.telephone = telephone
        }
        if (email){
            user.email = email
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
        let { usersID,userName,password,telephone,email,image,desc } = req.body
        let user = await Users.findByPk(usersID)
        if (user){
            if (userName){
                user.userName = userName
            }
            if (password){
                user.password = bcrypt.hashSync(password,10)
            }
            if (telephone){
                user.telephone = telephone
            }
            if (email){
                user.email = email
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
        let { userID } = req.body
        if (!userID){
            response(res,422,null,"用户删除失败")
            return
        }
        let user = await Users.findByPk(userID)
        if (user){
            const destroy = await Users.destroy({
                where:{
                    userID:userID
                }
            })
            response(res,200,dto(user),"注销成功")
            return
        }
        response(res,422,null,"注销失败,找不到用户")
    }
}

module.exports = controller