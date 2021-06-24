var mongoose = require('mongoose');
//处理邮箱第三方模块
var nodemailer = require('nodemailer');

var Mongoose = {
    url: 'mongodb://localhost:27017/01myapp',
    connect(){
        mongoose.connect(this.url, { useNewUrlParser: true }, (err)=>{
            if(err){
                console.log("数据库连接失败");
                return;
            }
            console.log("数据库连接成功1")
        });
    }
};

var Email = {
    config: {
        host: "smtp.qq.com",//指定邮箱
        port: 587,
        auth: {
            user: '550992963@qq.com',// generated ethereal user
            pass: 'mejyoqqynybdbbfc', // generated ethereal password
        }
    },
    get transporter(){
        return nodemailer.createTransport(this.config);
    },
    get verify(){
        return Math.random().toString().substring(2,6);
    },
    get time(){
        return Date.now()
    }
};

var Head = {
    baseUrl: 'http://localhost:3000/uploads/'
}

module.exports = {
    Mongoose,
    Email,
    Head
}