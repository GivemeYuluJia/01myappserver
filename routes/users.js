var express = require('express');
var userController = require('../controllers/users');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//登陆接口
router.post('/login', userController.login);
//注册接口
router.post('/register', userController.register);
//验证接口
router.get('/verify', userController.verify);
//登出接口
router.get('/loginout', userController.loginout);
//获取uesr接口
router.get('/getUser', userController.getUser);
//找回密码接口
router.post('/findPassword', userController.findPassword);
module.exports = router;
