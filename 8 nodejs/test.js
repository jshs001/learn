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