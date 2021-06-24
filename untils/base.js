var crypto = require('crypto');
var captcha = require('trek-captcha')

var setCrypto = (info)=>{
    return crypto.createHmac('sha256', '$%$%^jfdkf')
        .update(info) // 要加密的密码
        .digest('hex');
};
//图形验证码
var createVerify = (req, res)=>{
    return captcha().then((info)=>{
        info.buffer;
        info.token;
        return {
            token:info.token,
            buffer:info.buffer
        }

    }).catch(()=>{
        return false
    });
}


module.exports = {
    setCrypto,
    createVerify
};