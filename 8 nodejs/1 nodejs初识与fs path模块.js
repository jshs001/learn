// node.js 是基于Chrome V8引擎的JavaScript运行环境。
// 浏览器是js的前端运行环境，node.js是js的后端运行环境。node.js中无法调用DOM和BOM等浏览器内置对象。

// node.js仅仅提供了基础的功能和api。然而很多工具和框架如雨后春竹。如express（快速构建web应用）、electron（构建桌面应用）、restify（快速构建API接口项目）等
// node.js安装过程略 注意安装LTS版本（长期稳定版）

// 执行命令 cmd中 node js文件名
// console.log("hello world");

// fs文件系统模块
const fs = require("fs");

// path路径模块
const path = require("path");

// 读取文件内容 fs.readFile(文件名,[编码],回调函数)
// fs.readFile("test.txt","utf-8",function(err,data){ //读取成功时err为null，data为文件内容；失败时err为错误对象，data为undefined；
//     if(err){
//         console.log(err);
//         // console.log(err.message);
//     }else{
//         console.log(data);
//     }
// });

// // 写入文件 fs.writeFile(文件名,内容,[编码],回调函数) 编码默认utf-8 
// fs.writeFile("test.txt","hello world",function(err){ //写入成功时err为null；写入失败时err为错误对象
//     if(err){
//         console.log(err);
//     }else{
//         console.log("写入成功");
//     }
// });






// 演示路径问题

// 当以为如下路径和命令运行如下代码时候 会报路径错误 （相对路径的拼接问题）
// 原因:代码在运行的时候，会以执行 node 命令时所处的目录，动态拼接出被操作文件的完整路径，
// 可以使用绝对路径处理此问题。

// C:\Users\17611\Desktop\persion\learn> node '.\8 nodejs\1 nodejs初识与fs path模块.js'

// fs.readFile("test.txt","utf-8",function(err,data){ //相对路径
// fs.readFile("C:\\Users\\17611\\Desktop\\persion\\learn\\8 nodejs\\test.txt","utf-8",function(err,data){ //绝对路径：代码移植性差 后期也不好维护
// fs.readFile(__dirname + "/test.txt","utf-8",function(err,data){ //__dirname:当前文件所在目录的绝对路径
// fs.readFile(path.join(__dirname,"/test.txt"),"utf-8",function(err,data){ //path.join()方法：拼接路径片段
//     if(err){
//         console.log(err);
//         // console.log(err.message);
//     }else{
//         console.log(data);
//     }
// });






// path路径模块

// 使用 path,join() 方法，可以把多个路径片段拼接为完整的路径字符串:
// const pathStr = path.join('/a','/b/c','../','./d','c')
// console.log(pathStr)
// const pathStr2 = path.join(__dirname, './files/1.txt')
// console.log(pathStr2)

// path.basename() 方法：获取路径中的最后一部分
// const fpath = '/a/b/c/index.html'
// const fullName = path.basename(fpath)
// console.log(fullName)
// const nameWithoutExt = path.basename(fpath, '.html')
// console.log(nameWithoutExt)

// path.extname() 方法：获取路径中的扩展名
// const fpath = '/a/b/c/index.html'
// console.log(path.extname(fpath))






// 时钟案例 主要是把一个html文件拆分为纯的html文件，css文件，js文件，同时把纯html文件里通过链接导入纯css文件和js文件。

// 1 定义正则表达式，分别匹配 css，js 文件
// const regStyle = /<style>[\s\S]*<\/style>/
// const regScript = /<script>[\s\S]*<\/script>/
// // 2.1 调用 fs.readFile()方法读取文件
// fs.readFile(path.join(__dirname, '../素材/index.html'), 'utf8', function (err, datastr) {
//     // 2.2 读取 HTML 文件失败
//     if (err) return console.log('读取HTML文件失败!' + err.message)
//     // 2.3 读取文件成功后，调用对应的三个方法，分别拆解出 css，js，html 文件
//     resolveCSS(dataStr)
//     resolveJs(dataStr)
//     resolveHTML(dataStr)
// })

// // 3.1 定义处理 css 样式的方法
// function resolveCSS(htmlstr) {
//     //3.2 使用正则提取需要的内容
//     const r1 = regStyle.exec(htmlstr)
//     // 3.3 将提取出来的样式字符串，进行字符串的 replace 替换操作
//     const newCSS = r1[0].replace('<style>', '').replace('</style>', '')
//     // 3.4 调用 fs.writeFile()方法，将提取的样式，写入到 clock 目录中 index.css 的文件里面
//     fs.writeFile(path.join(_dirname, './clock/index.css'), newCSS, function (err) {
//         if (err) return console.log('写入 CSS 样式失败!' + err.message)
//         console.log('写入样式文件成功!')
//     })
// }

// // 4.1 处理 js 脚本
// function resolveJs(htmlstr) {
//     //4.2 使用正则提取页面中的<script></script>标签
//     const r2 = regScript.exec(htmlStr)
//     //4.3 将提取出来的脚本字符串，做进一步的处理
//     const newJS = r2[0].replace('</script>', '').replace('</script>', '')
//     //4.4将提取出来的js 脚本，写入到 index.js纹件中
//     fs.writeFile(path.join(dirname, './clock/index.js'), newJS, err => {
//         if (err) return console.l0g('写入 JavaScript 脚本失败!' + err.message)
//         console.l0g('写入 J5 脚本成功!')
//     })
// }

// // 5.1 定义处理 HTML 结构的方法
// function resolveHTML(htmlstr) {
//     // 5.2 将字符串调用 replace 方法，把内嵌的 style 和 script 标签，替换为外联的 link 和 script 标签
//     const newHTML = htmlstr.replace(regStyle, '<link rel="stylesheet" href="./index.css” />').replace(regScript, '<script src="./index.js"></script>')
//     //5.3写入 index.html 这个文件
//     fs.writeFile(path.join(__dirname, './clock/index.html'), newHTML, function(err){
//         if(err) return console.log('写入 HTML 文件失败!' + err.message)
//         console.log('写入 HTML 页面成功!')
//     })
// }

// 案例注意
// fs.writeFile0 方法只能用来创建文件，不能用来创建路径
// 重复调用 fs.writeFie0 写入同一个文件，新写入的内容会覆盖之前的旧内容