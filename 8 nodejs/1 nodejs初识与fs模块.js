// node.js 是基于Chrome V8引擎的JavaScript运行环境。
// 浏览器是js的前端运行环境，node.js是js的后端运行环境。node.js中无法调用DOM和BOM等浏览器内置对象。

// node.js仅仅提供了基础的功能和api。然而很多工具和框架如雨后春竹。如express（快速构建web应用）、electron（构建桌面应用）、restify（快速构建API接口项目）等
// node.js安装过程略 注意安装LTS版本（长期稳定版）

// 执行命令 cmd中 node js文件名
// console.log("hello world");

// fs文件系统模块
const fs = require("fs");

// 读取文件内容 fs.readFile(文件名,[编码],回调函数)
fs.readFile("test.txt","utf-8",function(err,data){ //读取成功时err为null，data为文件内容；失败时err为错误对象，data为undefined；
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
});

// // 写入文件 fs.writeFile(文件名,内容,[编码],回调函数) 编码默认utf-8
// fs.writeFile("test.txt","hello world",function(err){ //写入成功时err为null；写入失败时err为错误对象
//     if(err){
//         console.log(err);
//     }else{
//         console.log("写入成功");
//     }
// });