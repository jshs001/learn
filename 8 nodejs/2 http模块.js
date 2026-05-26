// http模块通过几行简单的代码就可以实现一个http服务器

// const http = require('http')  // 引入http模块

// const server = http.createServer() // 创建一个http服务器

// server.on('request', (req, res) => { // 监听request事件
//     // 基本实现
    
//     // // req是请求对象，包含了客户端相关的信息  req.url(请求url)  req.method（请求方法）
//     // const url = req.url
//     // const method = req.method
//     // // const str = `your request url is ${url}, and request method is ${method}`
//     // const str = '你的请求路径是${url}, 请求方法为${method}'
//     // console.log(str)
//     // console.log('Someone visit our http server')

//     // // res是响应对象  res.end()向客户端发送响应数据，并结束请求的处理过程 res.setHeader()设置响应头
//     // res.setHeader('Content-Type', 'text/html; charset=utf-8') // 设置响应头 防止中文乱码
//     // res.end(str)






//     // 根据不同的url 响应不同的内容

//     const url = req.url
//     let content = '<h1>404 Not Found</h1>'
//     if (url === '/' || url === '/index.html') { 
//         content = '<h1>Index Page</h1>'
//     }else if (url === '/about.html') { 
//         content = '<h1>About Page</h1>'
//     }
//     res.setHeader('Content-Type', 'text/html; charset=utf-8')
//     res.end(content)
// })

// server.listen(80, function () { // 监听80端口
//     console.log('server is running at http://127.0.0.1:80')
// })






// 案例 实现clock时钟的web服务器

// const http = require('http')
// const fs = require('fs')
// const path = require('path')

// const server = http.createServer()
// server.on('request', function (req, res) { 
//     const url = req.url
//     // const fpath = path.join(__dirname, url)  // 获取文件的绝对路径 

//     let fpath = ''                 
//     if(url === '/'){
//         fpath = path.join(__dirname, './clock/index.html') // 优化url路径 隐藏掉clock这一层目录，同时访问/返回index.html
//     }else{
//         fpath = path.join(__dirname, './clock',url)
//     }

//     fs.readFile(fpath, 'utf8',function (err, dataStr) { // 读取文件
//         if(err) return res.end('404 Not Found.')
//         res.end(dataStr)
//     })
// })
// server.listen(80, function () { // 监听80端口
//     console.log('server is running at http://127.0.0.1:80')
// })