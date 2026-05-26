console.log('test.js 模块正在被执行'); // 这行会在 require 时立即打印

const name = 'Node.js';

// 必须使用 module.exports 暴露数据，require 才能接收到
module.exports = {
    name: name,
    version: '1.0'
};