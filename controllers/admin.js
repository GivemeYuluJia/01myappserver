var UserModel = require('../models/users')

var index = async (req, res, next) => {
    res.send({
        msg:'管理员权限',
        status: 0
    })
};

var usersList = async(req, res, next) => {
    var result = await UserModel.usersList();
    if(result){
        res.send({
            msg: '所有用户信息',
            status: 0,
            data: {
                usersList: result
            }
        })
    }else{
        res.send({
            msg: '获取用户信息失败',
            status: -1
        })
    }
};

var updateFreeze = async(req, res, next) => {
    var {username, isFreeze} = req.body;
    var result = await UserModel.updateFreeze(username,isFreeze)
    if(result){
        res.send({
            msg: '账号冻结操作成功',
            status: 0
        })
    }else{
        res.send({
            msg: '账号冻结操作失败',
            status: -1
        }) 
    }
}

module.exports = {
    index,
    usersList,
    updateFreeze
}