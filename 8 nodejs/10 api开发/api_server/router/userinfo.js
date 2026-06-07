const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi') // 导入验证表单数据的中间件
const { update_userinfo_schema,update_password_schema,update_avatar_schema } = require('../schema/user') // 导入验证规则对象

// 导入路由处理函数模块
const userinfo_handler = require('../router_handler/userinfo')

// 挂载路由 获取用户基本信息模块
router.get('/userinfo', userinfo_handler.getUserInfo)

// 挂载路由 修改用户基本信息模块
// router.post('/userinfo', userinfo_handler.updateUserInfo)
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)

// 挂载路由 修改用户密码模块
// router.post('/updatepwd', userinfo_handler.updatePassword)
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword)

// 挂载路由 修改头像模块
// router.post('/update/avatar', userinfo_handler.updateAvatar)
router.post('/update/avatar', expressJoi(update_avatar_schema), userinfo_handler.updateAvatar)

module.exports = router