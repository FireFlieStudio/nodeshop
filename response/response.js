var response = function(res,code,data,msg){
    res.status(code).send({data:data,msg:msg})
}

module.exports = response