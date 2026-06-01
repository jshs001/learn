// 路由

// 路由： express中的路由是客户端的请求与服务器的处理函数之间的映射关系。

// express路由组成： 请求类型、请求url路径、处理函数 格式如下：
//     app.Method(Path2D,HANDLER)

// 当客户端的请求到达服务器后，会和路由进行匹配，请求方法和url匹配成功后就调用对应的处理函数处理请求。

// express中路由最简单的方式就是把路由直接挂在app上：上篇文章中的监听get post 请求的代码就是最简单的路由。





// 模块化路由

// 为了方便对路由进行模块化的管理，xpress 不建议将路由直接挂载到 app 上，而是推荐将路由抽离为单独的模块,将路由抽离为单独模块的步骤如下:
// ① 创建路由模块对应的 js 文件
// ② 调用 express.Router() 函数创建路由对象
// ③ 向路由对象上挂载具体的路由
// ④ 使用 module.exports 向外共享路由对象
// ⑤ 使用 app.use() 函数注册路由模块

// const express = require('express')
// const app = express()

// const router = require('./test') // 引入路由模块
// // app.use(router) // 使用 app.use() 注册路由模块

// app.use('/api',router) // 为路由模块添加前缀 /api，类似于托管静态资源时为静态资源添加前缀一样。


// app.listen(80, function () {
//   console.log('express server running at http://127.0.0.1')
// })

// 注意： app.use() 函数的作用，就是注册全局中间件






// 中间件

// 中间件： 在路由处理函数之前执行一些操作，从而实现一些功能。
// 当一个请求到达express服务器后，可以连续调用多个中间件，从而对这次请求进行预处理。
// express中间件的本质就是一个函数，格式如下：

// function middleware(req, res, next) { // next() 函数，表示执行下一个中间件
//   // 中间件的处理逻辑
//   next() // 调用 next() 函数，执行下一个中间件
// }

// 注意:中间件的形参列表中，必须包含一个next参数。而路由处理函数中只包含req和res。

// next函数是实现多个中间件连续调用的关键，它表示把流转关系转交给下一个中间件或路由。

// 1 全局中间件演示代码：

// const express = require('express')
// const app = express()

// // // 定义一个最简单的中间件函数
// // const mw = function (req, res, next) {
// //   console.log('最简单的中间件函数')
// //   // 把流转关系转交给下一个中间件或路由
// //   next()
// // }

// // // 将mw注册为全局生效的中间件
// // app.use(mw)

// app.use((req, res, next)=>{  // 这是定义全局中间件的简化形式
//   console.log('最简单的中间件函数')
//   next()
// })

// app.get('/', (req, res) => {
//   console.log('调用了 / 这个路由')
//   res.send('home page.')
// })

// app.get('/user', (req, res) => {
//   console.log('调用了 /user 这个路由')
//   res.send('user page.')
// })

// app.listen(80, function () {
//   console.log('express server running at http://127.0.0.1')
// })


// 中间件的作用：多个中间件之间，共享同一份 req 和 res。
// 基于这样的特性，我们可以在上游的中间件中，统一为 req 或 res 对象添加自定义的属性或方法，供下游的中间件或路由进行使用。

// 2 中间件的作用代码演示

// const express = require('express')
// const app = express()

// // 定义一个全局的记录访问次数的中间件
// app.use((req, res, next) => {
//   // 获取请求到达服务器的时间
//   const time = Date.now()
//   // 为 req 对象挂载一个属性，从而把时间共享给后面的所有路由
//   req.startTime = time
//   next()
// }) // 如果不使用中间件 这段时间代码需要在各个路由中都写一遍

// app.get('/', (req, res) => {
//   console.log('调用了 / 这个路由')
//   res.send('home page.' + req.startTime)
// })

// app.get('/user', (req, res) => {
//   console.log('调用了 /user 这个路由')
//   res.send('user page.' + req.startTime)
// })

// app.listen(80, function () {
//   console.log('express server running at http://127.0.0.1')
// })

// 3 可以使用app.use()方法注册多个全局中间件，多个全局中间件会按照注册的顺序依次执行。
// 演示代码：

// const express = require('express')
// const app = express()

// // 定义第一个全局中间件
// app.use((req, res, next) => {
//   console.log('调用了第一个全局中间件')
//   next()
// })

// // 添加第二个全局中间件
// app.use((req, res, next) => {
//   console.log('调用了第二个全局中间件')
//   next()
// })

// app.get('/', (req, res) => { 
//   console.log('调用了 / 这个路由')
//   res.send('home page.')
// })

// app.get('/user', (req, res) => { 
//   console.log('调用了 /user 这个路由')
//   res.send('user page.')
// })

// app.listen(80, function () {
//   console.log('express server running at http://127.0.0.1')
// })

// 4 局部生效的中间件：不使用app.use()注册中间件，而是直接将中间件函数作为路由的回调函数。
// 演示代码：

// const express = require('express')
// const app = express()

// const mw1 = function (req, res, next) {
//   console.log('局部生效的中间件1')
//   next()
// }

// app.get('/', mw1, (req, res) => { // mw1 局部生效的中间件 只在 / 路由中生效
//   console.log('调用了 / 这个路由')
//   res.send('home page.')
// })

// app.get('/user', (req, res) => { 
//   console.log('调用了 /user 这个路由')
//   res.send('user page.')
// })

// app.listen(80, function () {
//   console.log('express server running at http://127.0.0.1')
// })

// 5 定义多个局部中间件：

// const express = require('express')
// const app = express()

// const mw1 = function (req, res, next) {
//   console.log('局部生效的中间件1')
//   next()
// }

// const mw2 = function (req, res, next) {
//   console.log('局部生效的中间件2')
//   next()
// }

// // app.get('/', mw1,mw2, (req, res) => { // 定义多个局部中间件
// app.get('/', [mw1, mw2], (req, res) => { // 定义多个局部中间件 等价写法
//   console.log('调用了 / 这个路由')
//   res.send('home page.')
// })

// app.get('/user', (req, res) => {
//   console.log('调用了 /user 这个路由')
//   res.send('user page.')
// })

// app.listen(80, function () {
//   console.log('express server running at http://127.0.0.1')
// })

// 6 中间件使用的5个注意事项：
//    ① 一定要在路由之前注册中间件
//    ② 客户端发送过来的请求，可以连续调用多个中间件进行处理
//    ③ 执行完中间件的业务代码之后，不要忘记调用 next() 函数
//    ④ 为了防止代码逻辑混乱，调用 next() 函数后不要再写额外的代码
//    ⑤ 连续调用多个中间件时，多个中间件之间，共享 req和 res 对象






// 中间件的分类：
// 为了方便大家理解和记忆中间件的使用，Express 官方把常见的中间件用法，分成了5大类，分别是:
// ① 应用级别的中间件
// ② 路由级别的中间件
// ③ 错误级别的中间件
// ④ Express内置的中间件
// ⑤ 第三方的中间件

// 1 应用级别的中间件：通过app.use()、app.get()、app.post()等，绑定到app实例上的中间件，称为应用级别的中间件。
//    这里又分了全局和局部中间件 上文已提到。

// 2 路由级别的中间件：通过router.use()、router.get()、router.post()等，绑定到路由实例上的中间件，称为路由级别的中间件。
//    路由中间件的用法和应用级别中间件一样，没有任何区别。

// 3 错误级别的中间件：专门用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃。
//    格式：错误基本中间件的function处理函数，必须有四个形参，function (err, req, res, next)。
// 演示代码：
// const express = require('express')
// const app = express()

// app.get('/', (req, res) => { // 模拟错误
//   throw new Error('服务器挂了') 
//   res.send('home page.')
// })

// app.use((err, req, res, next) => { // 错误中间件 放到前面会出现一个错误html
//   console.log('错误中间件启动')
//   res.status(500).send(err.message) // 放到所有路由之后 这段代码生效
// })

// app.listen(80, function () {
//   console.log('express server running at http://127.0.0.1')
// })

// 注意：错误中间件必须放在所有路由之后，这样就能捕获所有错误了。

// 4 Express内置的中间件
// 自 Express 4.16.0版本开始，Express 内置了3个常用的中间件，极大的提高了 Express 项目的开发效率和体验:
//   express.static 快速托管静态资源的内置中间件，例如: HTML文件、图片、CSS 样式等(无兼容性)
//   express.json 解析 JSON 格式的请求体数据(有兼容性，仅在 4.16.0+ 版本中可用)
//   express.urlencoded 解析 URL-encoded 格式的请求体数据(有兼容性，仅在 4.16.0+ 版本中可用)

// 演示代码：

// const express = require('express')
// const app = express()

// // 注意 除了错误中间件，其他中间件，必须在路由之前进行注册
// // 通过express.json() 中间件，解析表单中的json格式数据
// app.use(express.json())

// // 通过express.urlencoded() 中间件，解析表单中的url-encoded格式数据
// app.use(express.urlencoded({ extended: false }))

// app.post('/user', (req, res) => { // postman发起请求 body->raw->json 里写入{"name":"zs","age":20}
//   // 在服务器，可以使用req.body属性，获取客户端发送过来的请求体数据
//   // 默认情况下，如果不配置解析表单数据的中间件，则 req.body 默认等于 undefined
//   console.log(req.body) //获取json格式数据
//   res.send('ok')
// })

// app.post('/book', (req, res) => { // postman发起请求 body->www-form-urlencoded 里写入bookname=li&author=施耐庵
//   console.log(req.body) //获取urlencoded格式数据 默认{}
//   res.send('ok')
// })

// app.listen(80, function () {
//   console.log('express server running at http://127.0.0.1')
// })

// 5.第三方的中间件
// 非 Express 官方内置的，而是由第三方开发出来的中间件，叫做第三方中间件。在项目中，大家可以按需下载并配置第三方中间件，从而提高项目的开发效率。
// 例如:在 express@4.16.0之前的版本中，经常使用 body-parser 这个第三方中间件，来解析请求体数据。使用步骤如下:
// ① 运行 npm install body-parser 安装中间件
// ② 使用 require 导入中间件
// ③ 调用 app.use() 注册并使用中间件

// 演示body-parser

// const express = require('express')
// const app = express()

// const parser = require('body-parser') // 导入解析表单数据的中间件
// app.use(parser.urlencoded({ extended: false })) // 注册解析表单数据的中间件

// app.post('/user', (req, res) => { //postman发起请求 body->www-form-urlencoded 里写入bookname=li&author=施耐庵
//   console.log(req.body) // 如果没有配置任何解析表单数据的中间件，则 req.body 默认等于 undefined
//   res.send("ok")
// })

// app.listen(80, function () { // 监听80端口
//   console.log('express server running at http://127.0.0.1')
// })

// 注意：express内置的express.urlencoded中间件，就是基于body-parser这个第三方中间件进一步封装出来的。





// 自定义一个中间件 案例，模拟类似express.urlencoded中间件的功能,来解析post请求的表单数据。

// 实现步骤:
//    定义中间件
//    监听 req 的 data 事件
//    监听 req 的 end 事件
//    使用 querystring 模块解析请求体数据
//    将解析出来的数据对象挂载为 req.body
//    将自定义中间件封装为模块

// const express = require('express')
// const app = express()

// // 导入node内置模块 querystring
// const qs = require('querystring')

// // 解析表单数据的中间件
// app.use(function (req, res, next) {
//   // 在中间件中，需要监听 reg 对象的 data 事件，来获取客户端发送到服务器的数据。
//   // 如果数据量比较大，无法一次性发送完毕，则客户端会把数据切割后，分批发送到服务器。
//   // 所以 data 事件可能会触发多次，每一次触发 data 事件时，获取到数据只是完整数据的一部分，需要手动对接收到的数据进行拼接。
//   let str = ''
//   req.on('data', function (chunk) {
//     str += chunk
//   })
//   // 当请求体数据接收完毕后，会自动触发req的end事件。因此可以在req的end事件中，处理完整的请求体数据。
//   req.on('end', function () {
//     // console.log(str)
//     const body = qs.parse(str)
//     // console.log(body)
//     req.body = body
//     next()
//   })

// })

// app.post('/user', function (req, res) {
//   res.send(req.body)
// })

// app.listen(80, function () {
//   console.log('express server running at http://127.0.0.1')
// })

// 将自定义中间件封装为模块后的代码

// const express = require('express')
// const app = express()

// const coutomBodyParser = require('./test')

// // 解析表单数据的中间件
// app.use(coutomBodyParser)

// app.post('/user', function (req, res) {
//   res.send(req.body)
// })

// app.listen(80, function () {
//   console.log('express server running at http://127.0.0.1')
// })
