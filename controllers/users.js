var UserModel = require('../models/users')

//node大部分都是异步，简化异步回调用async和await
var login = async (req, res, next) =>{
    var {username, password} = req.body;
    var result = await UserModel.findLogin({
        username,
        password
    });
    if(result){
        req.session.username = username;
        res.send({
            msg: '登陆成功',
            status: 0
        });
    }else{
        res.send({
            msg: '登录失败',
            status: -1
        })
    }
};
var register = async (req, res, next) =>{
    var {username, password, repassword, email} = req.body;
    //用户名或邮箱其中一个为空
    if(!username || !email){
        res.send({
            msg: '用户名或邮箱未输入',
            status: -5
        });
        return;
    }
    //密码和确认密码其中一个为空
    if(!password || !repassword){
        res.send({
            msg: '密码或确认密码不能为空',
            status: -4
        });
        return;
    }
    //两次密码输入不一致
    if(password !== repassword){
        res.send({
            msg: '两次输入密码不一致',
            status: -3
        });
        return;
    }

    var result = await UserModel.save({
		username,
		password,
        email
	});
    if(result){
        res.send({
            msg: '注册成功',
            status: 0
        });
    }
    else{
        res.send({
            msg: '注册失败',
            status: -2
        });
    }
};
var verify = async (req, res, next) =>{

};
var loginout = async (req, res, next) =>{
    req.session.username = '';
    res.send({
        msg: '退出成功',
        status: 0
    });
};
//判断用户是否登陆
var getUser = async (req, res, next) =>{
    if(req.session.username){
		res.send({
			msg: '获取用户信息成功',
			status: 0,
			data: {
				username: req.session.username
			}
		});
	}else{
		res.send({
			msg: '获取用户信息失败',
			status: -1
		});
	}
};
var findPassword = async (req, res, next) =>{
    var { email, username, password, newpassword} = req.body;
    var result = await UserModel.findPassword(username, newpassword);
    //用户名或邮箱其中一个为空
    if(!username || !email){
        res.send({
            msg: '用户名或邮箱未输入',
            status: -5
        });
        return;
    }
    //密码和确认密码其中一个为空
    if(!password || !newpassword){
        res.send({
            msg: '旧密码或新密码不能为空',
            status: -4
        });
        return;
    }
    if(password === newpassword){
        res.send({
            msg: '旧密码和新密码不能一致',
            status: -3
        });
        return;
    }
    if(result){
        req.session.password = password
        req.session.newpassword = newpassword
        res.send({
            msg: '密码修改成功',
            status: 0,
            data:{
                password: req.session.password,
                newpassword: req.session.newpassword
            }
        });
    }else{
        res.send({
            msg: '密码修改失败',
            status: -1
        });
    }
};

module.exports = {
    login,
    register,
    verify,
    loginout,
    getUser,
    findPassword
}