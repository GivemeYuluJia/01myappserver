var  mongoose = require('mongoose');
//index生效,添加index索引
mongoose.set('useCreateIndex',true);
var {Head} = require('../untils/config')
var url = require('url')

//  定义了一个新的模型，但是此模式还未和users集合有关联
var UserSchema = new mongoose.Schema({
    username : {type: String, required: true, index: {unique: true}},
    password : {type: String, required: true},
    email : {type: String, required: true, index: {unique: true}},
    date : {type: Date, default: Date.now()},
    isAdmin: {type: Boolean, default: false},
    isFreeze: {type: Boolean, default:false},
    userHead: {type: String, default: url.resolve(Head.baseUrl, '1.jpg')}
});
//  与users集合关联
var UserModel = mongoose.model('user',UserSchema);
UserModel.createIndexes();
//save将数据保存在数据库
var save = (data)=>{
    var user = new UserModel(data);
    return user.save()
    .then(()=>{
        return true;
    })
    .catch(()=>{
        return false;
    })
};

var findLogin = (data)=>{
    return UserModel.findOne(data)
};

var findPassword = (username, password)=>{
    return UserModel.update({username}, {$set: {password}})
    .then(()=>{
        return true
    })
    .catch(()=>{
        return false
    })
};

var updateFreeze = (username, isFreeze) => {
    return UserModel.update({username},{ $set: { isFreeze } })
    .then(()=>{
        return true
    })
    .catch(()=>{
        return false
    })
};

var usersList = () => {
    return UserModel.find();
};

var deleteUser = (username)  => {
    return UserModel.deleteOne({username});
};

var updateUserHead = (username,userHead) => {
    return UserModel.update({username}, { $set: { userHead } })
            .then(()=>{
                return true;
            })
            .catch(()=>{
                return false;
            })
}

module.exports = {
    save,
    findLogin,
    findPassword,
    usersList,
    updateFreeze,
    deleteUser,
    updateUserHead
}

