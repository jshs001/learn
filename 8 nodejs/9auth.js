// 1 web开发模式

//  1） 基于服务端渲染的传统web开发模式：服务器发送给客户端的html，是服务器通过字符串拼接，动态生成的。因此客户端不需要使用 Ajax 这样的技术额外请求页面的数据。代码示例如下:
//      app.get('/index.html', (req, res) => {
//          // 要渲染的数据
//          const user = { name: 'zs', age: 20 }3
//          // 服务器端通过字符串的拼接，动态生成HTML内容
//          const html = '<h1>姓名:${user.name}，年龄:${user.age}</h1>
//          // 把生成好的页面内容响应给客户端。因此，客户端拿到的是带有真实数据的 HTML页面
//          res.send(html)
//      })
//      服务端渲染的优缺点
//          优点:
//          前端耗时少。因为服务器端负责动态生成 HTML内容，浏览器只需要直接渲染页面即可。尤其是移动端，更省电。
//          有利于SEO。因为服务器端响应的是完整的 HTML 页面内容，所以爬虫更容易爬取获得信息，更有利于 SEO.
//          缺点:
//          占用服务器端资源。即服务器端完成 HTML 页面内容的拼接，如果请求较多，会对服务器造成一定的访问压力。
//          不利于前后端分离，开发效率低。使用服务器端渲染，则无法进行分工合作，尤其对于前端复杂度高的项目，不利于项目高效开发。

//  2） 基于前后端分离的新型web开发模式：依赖于 Ajax 技术的广泛应用。后端只负责提供 API 接口，前端使用 Ajax 调用接口。
//      前后端分离的优缺点
//          优点:
//          开发体验好。前端专注于 U1页面的开发，后端专注于api的开发，且前端有更多的选择性。
//          用户体验好。Ajax 技术的广泛应用，极大的提高了用户的体验，可以轻松实现页面的局部刷新。
//          减轻了服务器端的渲染压力。因为页面最终是在每个用户的浏览器中生成的。
//          缺点:
//          不利于 SEO。因为完整的 HTML 页面需要在客户端动态拼接完成，所以爬虫对无法爬取页面的有效信息。(解决方案:利用 Vue、React 等前端框架的 SSR(server side render)技术能够很好的解决 SEO 问题!)



// 2 如何选择 Web 开发模式

// 不谈业务场景而盲目选择使用何种开发模式都是耍流氓。

// 比如企业级网站，主要功能是展示而没有复杂的交互，并且需要良好的 SEO，则这时我们就需要使用服务器端渲染;
// 而类似后台管理项目，交互性比较强，不需要考虑 SEO，那么就可以使用前后端分离的开发模式

// 另外，具体使用何种开发模式并不是绝对的，为了同时兼顾了首页的渲染速度和前后端分离的开发效率，一些网站采用了首屏服务器端渲染 + 其他页面前后端分离的开发模式



// 3 身份认证

// 对于服务端渲染和前后端分离这两种开发模式来说，分别有着不同的身份认证方案
//     服务端渲染推荐使用 Session 认证机制
//     前后端分离推荐使用 JWT 认证机制



// 4 Session 认证

// HTTP 协议的无状态性：客户端的每次 HTTP 请求都是独立的，连续多个请求之间没有直接的关系，服务器不会主动保留每次 HTTP 请求的状态。
// 通过Cookie突破HTTP的无状态性。

// Cookie 是存储在用户浏览器中的一段不超过 4KB 的字符串。它由一个名称(Name)、一个值(Value)和其它几个用于控制 Cookie 有效期、安全性、使用范围的可选属性组成。
// 查看Cookie：f12 -> Application -> Storage -> Cookies
// 不同域名下的 Cookie 各自独立，每当客户端发起请求时，会自动把当前域名下所有未过期的 Cookie 一同发送到服务器。
// Cookie特性：自动发送；域名独立；过期时限；4KB限制；

// Cookie 在身份认证中的作用：
// 客户端第一次请求服务器的时候，服务器通过响应头的形式，向客户端发送一个身份认证的 Cookie，客户端会自动将 Cookie 保存在浏览器中。
// 随后，当客户端浏览器每次请求服务器的时候，浏览器会自动将身份认证相关的 Cookie，通过请求头的形式发送给服务器，服务器即可验明客户端的身份。
// 查看：打开浏览器访问www.baidu.com，f12 network all 第一个document请求里 request headers 栏里有Cookie 字段。

// Cookie 不具有安全性：
//     由于 Cookie 是存储在浏览器中的，而且浏览器也提供了读写 Cookie 的 API，因此 Cookie 很容易被伪造，不具有安全性。
//     因此不建议服务器将重要的隐私数据，通过 Cookie 的形式发送给浏览器。
//     千万不要使用Cookie 保存重要且隐私的数据 如密码，用户名，sessionId 等敏感信息。

// Session的工作原理：
//     客户端登录提交账号密码，服务器验证账号密码后生成sessionId，将sessionId通过Cookie返回给客户端。浏览器将Cookie保存到当前域名下。
//     客户端每次请求，都会将Cookie发送给服务器，服务器根据Cookie中的sessionId，获取对应的session数据。
//     服务器认证成功后针对用户请求生成特定的响应内容，将响应内容返回给客户端。



// 5 express中使用session认证

// 安装express-session中间件：npm i express-session
// 安装后使用app.use()来注册session中间件

// 样例代码如下：
// const express = require('express')
// const session = require('express-session')
// const cors = require('cors')

// const app = express()

// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
// app.use(cors({
//     origin: true, // 反射请求的 Origin，允许所有来源
//     credentials: true // 关键：允许客户端携带 Cookie
// }))


// app.use(session({
//     secret:'itheima', // 配置加密字符串，防止cookie被恶意伪造
//     resave:false, // 强制保存，即使session没有被修改，也保存session
//     saveUninitialized:true, // 强制将未初始化的session保存
// }))

// // 向 session 中存数据
// // 当 express-session 中间件配置成功后，即可通过 req.session 来访问和使用 session 对象，从而存储用户的关键信息:
// app.post('/api/login', (req, res) => { // 登录的api接口
//     if (req.body.username !== 'admin' || req.body.password !== '123') {  // 判断用户账号和密码是否正确
//         return res.send({status: 1,message: '登录失败'})
//     }
//     req.session.user = req.body // 将用户信息保存到 session 中
//     req.session.isLogin = true  // 登录状态
//     res.send({status: 0,message: '登录成功'})
// })

// // 从 session 中取数据
// // 可以直接从 req.session 对象上获取之前存储的数据。
// app.get('/api/username',(req,res)=>{  // 获取用户信息接口
//     if (!req.session.isLogin) {  // 判断用户是否登录
//         return res.send({status: 1,message: 'fail'})
//     }
//     res.send({
//         status: 0,
//         message: 'success',
//         data: req.session.user // 响应用户个人数据
//     })
// })

// // 清空 session
// // 调用 req.session.destroy()函数，即可清空服务器保存的 session 信息。
// app.post('/api/logout',(req,res)=>{  // 退出登录接口
//     // 清除当前客户端对应的 session 数据
//     req.session.destroy()
//     res.send({
//         status: 0,
//         message: '退出登录成功'
//     })
// })

// app.listen(80,function(){
//     console.log('express server running at http://127.0.0.1')
// })

// 使用9测试session.html 验证即可 一定要用live server启动：file协议浏览器没有域名存不上cookie；另外cors会给http协议发送Origin,不会给file://协议发送Origin，或者发了也是null；现代浏览器对 file:// 协议有额外的沙箱限制。
// 使用postman测试api：点击send下面的cookies，在对应的domain下面点击add cookie，填入name和value（把浏览器存的cookie信息down下来），点击save。然后在发送请求时候 就会自动带上cookie了。

// Session 认证的局限性
// Session 认证机制需要配合 Cookie 才能实现。由于 Cookie 默认不支持跨域访问，所以，当涉及到前端跨域请求后端接口的时候，需要做很多额外的配置，才能实现跨域 Session 认证。

// 注意:
// 当前端请求后端接口不存在跨域问题的时候，推荐使用 Session 身份认证机制。
// 当前端需要跨域请求后端接口的时候，不推荐使用 Session 身份认证机制，推荐使用 JWT 认证机制。



// 6 JWT认证机制

// JWT(英文全称:JSON Web Token)是目前最流行的跨域认证解决方案
// JWT工作原理：
//     客户端登录提交账号密码，服务端验证成功后，将用户的信息对象加密后生成Token字符串发送给客户端。浏览器将Token存储到LocalStorage或SessionStorage中。
//     客户端再次发送请求时通过请求头的Authorization字段将Token发送给服务端。服务端收到Token后，将Token解密，得到用户信息对象，然后验证.
//     服务端验证成功后，把处理用户请求并返回响应内容。
// 总结:用户的信息通过Token 字符串的形式，保存在客户端浏览器中。服务器通过还原 Token 字符串的形式来认证用户的身份。

// JWT 通常由三部分组成，分别是Header(头部)、Payload(有效荷载)、Signature(签名)。三者之间使用英文的“.”分隔，格式如下:
//     Header.Payload.signature
//     Payload 部分才是真正的用户信息，它是用户信息经过加密之后生成的字符串。
//     Header 和 Signature 是安全性相关的部分，只是为了保证 Token 的安全性。

// JWT 的使用方式：
//     客户端收到服务器返回的 JWT 之后，通常会将它储存在 localStorage 或 sessionStorage 中。此后，客户端每次与服务器通信，都要带上这个JT的字符串，从而进行身份认证。
//     推荐的做法是把JWT 放在 HTTP请求头的 Authorization 字段中，格式如下:
//     Authorization:Bearer <token>




// 7 express中使用jwt 

// 安装如下两个包： npm install jsonwebtoken express-jwt
// jsonwebtoken: 用于生成JWT字符串
// express-jwt: 用于将JWT字符串还原成JSON对象

// const express = require('express')
// const jwt = require('jsonwebtoken') // 引入jsonwebtoken包
// const { expressjwt: expressJwt } = require('express-jwt')  // 引入 express-jwt 包

// const app = express()

// app.use(express.json())  // 配置解析表单数据的中间件
// app.use(express.urlencoded({ extended: false })) // 配置解析表单数据的中间件

// const cors = require('cors') // 配置 cors 中间件，从而解决跨域问题
// app.use(cors())

// // 定义 secret 密钥
// // 为了保证 JWT 字符串的安全性，防止 JWT,字符串在网络传输过程中被别人破解，我们需要专门定义一个用于加密和解密的 secret 密钥:
// // ① 当生成 JWT 字符串的时候，需要使用 secret 密钥对用户的信息进行加密，最终得到加密好的 JWT 字符串
// // ② 当把 JWT 字符串解析还原成 JSON 对象的时候，需要使用 secret 密钥进行解密
// const secretKey = 'itheima2019'

// // 将 JWT 字符串还原为 JSON 对象
// // 客户端每次在访问那些有权限接口的时候，都需要主动通过请求头中的 Authorization 字段，将 Token 字符串发送到服务器进行身份认证。
// // 此时，服务器可以通过 express-jwt 这个中间件，自动将客户端发送过来的 Token 解析还原成 JSON 对象:
// app.use(expressJwt({ secret: secretKey,algorithms: ['HS256'] }).unless({ path: [/^\/api\//] })) // 这里要用v6版本 否则不能这么写
// // unless({ path: [/^\/api\//] }) 表示除了以 /api/ 开头的接口，其他接口都需要进行身份认证

// // 登录接口
// app.post('/api/login', function (req, res) { 
    
//     const userinfo = req.body // 接收客户端发送的用户信息

//     if (userinfo.username !== 'admin' || userinfo.password !== '123456') {  // 验证用户信息
//         return res.send({ status: 1, message: '登录失败' }) // 登录失败
//     }    

//     // 登录成功
//     // 调用 jwt.sign() 方法生成 JWT 字符串，第一个参数是规则对象，第二个参数是加密的密钥，第三个参数是配置对象，可以指定 token 的有效期
//     const tokenStr = jwt.sign({ username: userinfo.username }, secretKey, { expiresIn: '30s' }) // 千万不要将密码加密到token字符串中

//     res.send({
//         status: 0,
//         message: '登录成功',
//         token: tokenStr // 将 JWT 字符串，响应给客户端
//     })
// })

// // 这是一个有权限的接口
// app.get('/admin/getinfo', (req, res) => { // 只有登录成功，并且携带了正确的 JWT Token，才能访问此接口

//     // 使用 req.user 获取用户信息
//     // 当 express-jwt 这个中间件配置成功之后，即可在那些有权限的接口中，使用 req.auth 对象，来访问从 JWT 字符串中解析出来的用户信息了，示例代码如下:
//     console.log(req.auth)

//     res.send({
//         status: 0,
//         message: '获取用户信息成功',
//         data: req.auth // 获取用户信息
//     })
// })

// // 捕获解析 JWT 失败后产生的错误
// // 当使用 express-jwt 解析 Token 字符串时，如果客户端发送过来的 Token 字符串过期或不合法，会产生一个解析失败的错误，影响项目的正常运行。
// // 我们可以通过 Express 的错误中间件，捕获这个错误并进行相关的处理，示例代码如下
// app.use((err, req, res, next) => { // 捕获验证失败后的错误
//     if (err.name === 'UnauthorizedError') { // token解析失败的错误
//         return res.send({ status: 401, message: '无效的 Token' }) 
//     }
//     res.send({ status: 500, message: '未知的错误' }) // 其他原因导致的错误
// })

// app.listen(80, function () { // 启动服务器
//     console.log('express server running at http://127.0.0.1')
// })

// 验证 
// 1 使用postman 访问post http://127.0.0.1/api/login body www-form-urlencoded username admin password 123456
//   会返回一个token

// 2 使用postman 访问get http://127.0.0.1/admin/getinfo Headers
//   请求头添加 Authorization:Bearer <token>
//   会返回用户信息
