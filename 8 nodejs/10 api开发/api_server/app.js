const express = require('express');
const app = express();

const joi = require('joi');

// 配置cors跨域
const cors = require('cors');
app.use(cors());

// 解析表单数据
app.use(express.urlencoded({ extended: false })) // 处理application/xxx-www-form-urlencoded格式的表单数据
app.use(express.json()) // 处理application/json格式的表单数据

// 响应数据的中间件 一定要在所有路由之前
app.use(function (req, res, next) {
  // status = 0 为成功； status = 1 为失败； 默认将status的值设置为1，方便处理失败的情况
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})

// 一定要在路由之前配置解析Token中间件
const { expressjwt: expressJwt } = require('express-jwt');
const config = require('./config');

app.use(expressJwt({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] })) // 登录和注册接口不需要验证token

// 导入并使用路由模块
const userRouter = require('./router/user');
app.use('/api', userRouter);

// 导入并使用用户路由模块
const userinfoRouter = require('./router/userinfo');
app.use('/my', userinfoRouter);

// 导入并使用文章分类路由模块
const artcateRouter = require('./router/artcate');
app.use('/my/article', artcateRouter);

// 导入并使用文章路由模块
const articleRouter = require('./router/article');
app.use('/my/article', articleRouter);

// 定义错误级别中间件
app.use(function (err, req, res, next) { // 错误级别中间件
  // 验证失败导致的错误
  if (err instanceof joi.ValidationError) {
    console.log(err.details);
    return res.cc(err)
  }
  // 捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError') {
    console.log('JWT 错误详情:', err.message); // 添加这一行日志
    return res.cc('身份认证失败！')
  }// 注意此处的return必须加 不然会继续往下执行 连续两次调用send()就会报错
  // 将其他错误，交给下一中间件处理
  res.cc(err)
})

app.listen(3007, function () { // 监听3000端口
  console.log('app server running at http://127.0.0.1:3007') // 输出提示信息
})