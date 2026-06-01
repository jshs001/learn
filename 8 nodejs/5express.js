// 什么是 Express
//     官方给出的概念:Express 是基于 Node.js 平台，快速、开放、极简的 Web 开发框架
//     通俗的理解:Express 的作用和 Node.js 内置的 http 模块类似，是专门用来创建 Web 服务器的。
//     Express 的本质:就是一个 npm 上的第三方包，提供了快速创建 Web 服务器的便捷方法。
//     Express 的中文官网:http://www.expressjs.com.cn/
//     使用Express 可以方便快速的创建 Web 网站服务器或api接口服务器

// 安装express
// npm i express@4.17.1

// 创建基本的Web服务器
// const express = require('express') // 引入express
// const app = express() // 创建web服务器
// app.listen(80, function () { // 监听80端口
//   console.log('express server running at http://127.0.0.1')
// })





// 监听客户端get 和post 请求 ;写到 listen 上面 ；修改代码后需要重启服务
// const express = require('express')
// const app = express()

// // 监听get请求： 参数1 url ；参数2 回调函数 req res（请求对象 响应对象）
// app.get('/user', function (req, res) {
//     res.send({ name: 'zs', age: 18, gender: '男' })
// })
// // postman 验证地址 http://localhost/user

// // 监听post请求：参数1 url ；参数2 回调函数 req res（请求对象 响应对象）
// app.post('/user', function (req, res) {
//     // res.send() ：可以向客户端发送文本字符串或JSON数据
//     res.send('请求成功')
// })
// // postman 验证地址 http://localhost/user

// app.get('/', function (req, res) {
//     console.log(req.query) // get请求的参数会放在req.query对象中
//     res.send(req.query)
// })
// // postman 验证地址 http://localhost/

// // app.get('/user/:id', function (req, res) { // :id 是一个动态参数 id可以换 id就是key 
// app.get('/user/:id/:name', function (req, res) { // 动态参数可以写多层
//     console.log(req.params) // get请求的动态参数会放在req.params对象中
//     res.send(req.params)
// })
// // postman 验证地址 http://localhost/1/zs 或http://localhost/1

// app.listen(80, function () { // 启动服务器
//     console.log('server running at http://127.0.0.1')
// })






// express.static() 函数用于托管静态资源

// express 提供了一个非常好用的函数，叫做 express.static()，通过它，我们可以非常方便地创建一个静态资源服务器.
// 例如，通过如下代码就可以将 public 目录下的图片、CSS 文件、JavaScript 文件对外开放访问了:
// app.use(express.static('public'))
// 现在，你就可以访问 public 目录中的所有文件了:
//     http://localhost:3000/images/bg.jpg
//     http://localhost:3000/css/style.css
//     http://localhost:3000/js/login.js
// 注意 Express 在指定的静态目录中查找文件，并对外提供资源的访问路径注意:因此，存放静态文件的目录名不会出现在 URL 中。

// 托管多个静态资源目录
// 如果要托管多个静态资源目录，请多次调用 express.static0 函数:
//     1 app.use(express.static('public'))
//     2 app.use(express.static('files'))
// 访问静态资源文件时，express.static() 函数会根据目录的添加顺序查找所需的文件。

// 挂载路径前缀
// 如果希望在托管的静态资源访问路径之前，挂载路径前缀，则可以使用如下的方式:
//     1 app.use('/public'，express.static('public'))
// 现在，你就可以通过带有 /public 前缀地址来访问 public 目录中的文件了:
//     http://localhost:3000/public/images/kitten,jpg
//     http://localhost:3000/public/css/style.css
//     http://localhost:3000/public/js/appjs

// const express = require('express')
// const app = express()

// //课程的案例 是在这里提供时钟案例的js html css 文件
// // app.use(express.static('./public')) 

// //托管多个静态资源目录
// // app.use(express.static('./files'))  
// // app.use(express.static('./public'))

// // 挂载路径前缀
// // app.use('/public', express.static('./public'))

// app.listen(80, () => {
//     console.log('server is running at http://127.0.0.1:80')
// })






// 使用nodemon ： 这个工具能够监听文件变化，然后重启服务
// 安装 nodemon ： npm i nodemon -g
// 使用：用nodemon app.js   来 替换node app.js即可