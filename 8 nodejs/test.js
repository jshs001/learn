// 4 加载模块测试
// console.log('test.js 模块正在被执行'); // 这行会在 require 时立即打印

// const name = 'Node.js';

// // 必须使用 module.exports 暴露数据，require 才能接收到
// module.exports = {
//     name: name,
//     version: '1.0'
// };



// 5 模块作用域测试

// const username = '张三';
// function sayHello() {
//     console.log('大家好！ 我是' + username);
// }   



// 6 module对象
// module.exports对象测试

// module.exports.username = '张三';
// module.exports.sayHello = function() {
//     console.log('大家好！ 我是' + this.username);
// }

// // 测试使用require()导入自定义模块时，导入的结果，永远以module.exports 指向的对象为准。
// module.exports = { //module.exports = {};
//     nickname: 'lisi',
//     sayHi: function() {
//         console.log('大家好！ 我是' + this.nickname);
//     }
// }



// 7 exports对象
// exports.username = 'lisi';
// exports.sayHi = function() {
//     console.log('大家好！ 我是' + this.username);
// }

// exports和module.exports使用误区 
// 演示1
// exports.username = 'lisi'; // 不返回
// module.exports = {   // 返回
//     gender : '男',
//     sayHi: function() {
//         console.log('大家好！ 我是' + this.username);
//     }
// }

// 演示2
// module.exports.username = 'lisi'; // 返回
// exports = {   // 不返回
//     gender : '男',
//     sayHi: function() {
//         console.log('大家好！ 我是' + this.username);
//     }
// }

// 演示3
// exports.username = 'lisi'; // 返回
// module.exports.gender = '男'; // 返回

// 演示4
// exports = { // 返回
//     username: 'lisi',
//     gender: '男'
// }
// module.exports = exports;
// module.exports.age = 18; // 返回


// 模块的加载机制演示
// console.log('ok');




// 模块化路由演示
// const express = require('express');
// const router = express.Router(); // 创建路由对象

// router.get('/user/list', function (req, res) { // 监听 / 路径
//     res.send('Get user list.') // 响应hello express
// })

// router.post('/user/add', function (req, res) { // 监听 / 路径
//     res.send('Add new user.') // 响应
// })

// module.exports = router;




// 6 express1 自定义模块演示
// const qs = require('querystring')

// const bodyParser = function (req, res, next) {
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
// }

// module.exports = bodyParser



// 7express2_cors_jsonp.js 代码演示 包含跨域和预检请求
const express = require('express') // 引入express
const router = express.Router() // 创建路由对象

router.get('/get',(req,res)=>{
    const query = req.query // req.query获取客户端通过查询字符串，发送到服务器的数据。
    res.send({
        status:0, // 状态码 0表示成功 1表示失败
        msg:'get请求成功', // 状态描述
        data:query // 返回数据
    })
})

router.post('/post',(req,res)=>{
    const body = req.body // req.body获取客户端通过请求体，发送到服务端的数据。
    res.send({
        status:0, // 状态码 0表示成功 1表示失败
        msg:'post请求成功', // 状态描述
        data:body // 响应给客户端的数据
    })
})

router.delete('/delete',(req,res)=>{
    res.send({
        status:0, // 状态码 0表示成功 1表示失败
        msg:'delete请求成功' // 状态描述
    })
})

module.exports = router // 导出路由对象