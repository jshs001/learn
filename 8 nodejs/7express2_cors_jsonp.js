// 使用express写接口 代码如下 本文件名必须英文无空格 否则nodemon跑不起来

const express = require('express'); // 引入express
const app = express(); // 创建应用实例 app

app.use(express.urlencoded({ extended: false })); // 配置解析表单数据的中间件

// 必须在配置cors之前配置jsonp的接口
app.get('/api/jsonp', (req, res) => {    // 配置jsonp接口 需要手动加/api前缀 因为jsonp接口没有放到路由中间件模块里
  // 1 得到函数的名称
  const funcName = req.query.callback;
  // 2 定义要发送到客户端的数据对象
  const data = { name: 'zs', age: 20 };
  // 3 拼接处一个函数调用
  const scriptStr = `${funcName}(${JSON.stringify(data)})`;
  // 4 把拼接的字符串，响应给客户端
  res.send(scriptStr);
}) // 演示jsonp请求 见7测试接口跨域问题.html jsonp按钮


// 通过cors中间件 处理跨域问题 跨域测试通过打开7测试接口跨域问题.html 后查看浏览器控制台 点击请求按钮接口看到
// cors是由一系列的HTTP响应头组成，浏览器的同源安全策略会默认阻止网页跨域请求，但如果接口服务器配置了cors相关的响应头，就可以解除浏览器跨域限制。
// cors在服务器端配置，客户端浏览器无需任何配置；cors浏览器有兼容性，只有支持XMLHttpRequest2的浏览器才能使用cors服务器接口（如IE10+、chrome4+、firefox3.5+）
// cors是express的一个第三方中间件，安装 npm i cors。使用方法如下：
const cors = require('cors'); // 引入cors
app.use(cors());  //一定要在路由之前调用cors中间件

const router = require('./test');   // 引入路由模块
app.use('/api', router); // 注册为应用全局中间件

app.listen(80, function () { // 监听80端口
  console.log('server is running at http://127.0.0.1') // 输出提示信息
})




// cors跨域响应头

// 1 Access-Control-Allow-Origin语法格式如下：
// Access-Control-Allow-Origin: <origin> | *
// 其中，origin为允许请求的源url，*表示允许任意源；
// res.setHeader('Access-Control-Allow-Origin', 'http://itcast.cn') // 表示只允许http://itcast.cn这个源的请求。http://itcast.cn换为*表示允许任意源的请求。

// 2 Access-Control-Allow-Headers：
// 默认情况下，CORS 仅支持客户端向服务器发送如下的9个请求头:
// Accept,Accept-Language、Content-Language、DPR、 Downlink,Save-Data、 Viewport-Width、 Width 、Content-Type(值仅限于 text/plain、multipart/form-data、application/x-www-form-urlencoded 三者之一）
// 如果客户端向服务器发送了额外的请求头信息，则需要在服务器端，通过 Access-Control-Alow-Headers 对额外的请求头进行声明，否则这次请求会失败!

// 如允许客户端额外向服务器发送Content-Type 请求头和 X-Custom-Header 请求头
// 注意:多个请求头之间使用英文的返号进行分割
// res.setHeader('Access-Control-Allow-Headers', 'content-Type, X-Custom-Header' )

// 3 Access-Control-Allow-Methods
// 默认情况下，CORS 仅支持客户端发起 GET、POST、HEAD 请求。
// 如果客户端希望通过 PUT、DELETE 等方式请求服务器的资源，则需要在服务器端，通过 Access-Control-Alow-Methods来指明实际请求所允许使用的 HTTP 方法。

// 示例代码如下:
// 只允许 POST、GET、DELETE、HEAD 请求方法
// res.setHeader('Access-Control-Allow-Methods','POST, GET, DELETE, HEAD')
// 允许所有的 HTTP 请求方法
// res.setHeader('Access-Control-Allow-Methods','*')




// cors 请求分类

// 1 简单请求
//    同时满足以下两大条件的请求，就属于简单请求
//    ① 请求方式:GET、POST、HEAD 三者之一
//    ② HTTP 头部信息不超过以下几种字段:无自定义头部字段、Accept、Accept-Language、Content-Language、DPR、
//    Downlink、Save-Data、Viewport-Width、Width、Content-Type(只有三个值application/x-www-formurlencoded、multipart/form-data、text/plain)

// 2 预检请求
// 只要符合以下任何一个条件的请求，都需要进行预检请求:
//    ① 请求方式为 GET、POST、HEAD 之外的请求 Method 类型
//    ② 请求头中包含自定义头部字段
//    ③ 向服务器发送了 application/json 格式的数据

// 在浏览器与服务器正式通信之前，浏览器会先发送 OPTION 请求进行预检，以获知服务器是否允许该实际请求，所以这一次的 OPTION 请求称为“预检请求”。
// 服务器成功响应预检请求后，才会发送真正的请求，并且携带真实数据。

// 简单请求和预检请求的区别
//    简单请求的特点:客户端与服务器之间只会发生一次请求。
//    预检请求的特点:客户端与服务器之间会发生两次请求，OPTION 预检请求成功之后，才会发起真正的请求。

// 预检请求演示见 7测试接口跨域问题.html delete button  演示时候不要用chrome浏览器 用edge才能看到预检请求 ；打开浏览器F12查看Network 点击delete按钮





// JSONP 的概念与特点
// 概念:浏览器端通过<script>标签的 src 属性，请求服务器上的数据，同时，服务器返回一个函数的调用。这种请求数据的方式叫做 JSONP。
// 特点:
// ① JSONP 不属于真正的 Ajax 请求，因为它没有使用 XMLHttpRequest 这个对象。
// ② JSONP 仅支持 GET 请求，不支持 POST、PUT、DELETE 等请求。

// 创建 JSONP 接口的注意事项
// 如果项目中已经配置了 CORS 跨域资源共享，为了防止冲突，必须在配置 CORS 中间件之前声明 JSONP 的接口。否则JSONP 接口会被处理成开启了CORS的接口。

// 实现 JSONP 接口的步骤
// ① 获取客户端发送过来的回调函数的名字
// ② 得到要通过 JSONP 形式发送给客户端的数据
// ③ 根据前两步得到的数据，拼接出一个函数调用的字符串
// ④ 把上一步拼接得到的字符串，响应给客户端的<script>标签进行解析执行