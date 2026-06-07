const express = require('express')
const router = express.Router()

// 导入用户路由处理函数对应的模块
const user_handler = require('../router_handler/user')

const expressJoi = require('@escook/express-joi') // 导入验证表单数据的中间件
const { reg_login_schema } = require('../schema/user') // 导入验证规则对象

// 注册新用户
// router.post('/reguser', user_handler.regUser)
router.post('/reguser', expressJoi(reg_login_schema), user_handler.regUser) // 对 reg_login_schema 进行验证 检测表单数据是否合法

// 登录
// router.post('/login', user_handler.login) 
router.post('/login', expressJoi(reg_login_schema), user_handler.login) // 对 reg_login_schema 进行验证 检测表单数据是否合法


module.exports = router