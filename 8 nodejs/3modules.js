// 1 模块化

// 模块化是指解决一个复杂问题时，自顶向下逐层把系统划分成若干模块的过程。对于整个系统来说，模块是可组合、分解和更换的单元。

// 编程领域中的模块化，就是遵守固定的规则，把一个大文件拆成独立并互相依赖的多个小模块。

// 把代码进行模块化拆分的好处:
//     提高了代码的复用性
//     提高了代码的可维护性
//     可以实现按需加载



// 2 模块化规范

// 模块化规范就是对代码进行模块化的拆分与组合时，需要遵守的那些规则。

// 例如:
// 使用什么样的语法格式来引用模块
// 在模块中使用什么样的语法格式向外暴露成员

// 模块化规范的好处:大家都遵守同样的模块化规范写代码，降低了沟通的成本，极大方便了各个模块之间的相互调用，利人利己。


// 3 node.js中模块分类

// Node.js 中根据模块来源的不同，将模块分为了3 大类，分别是:
//     内置模块(内置模块是由 Node.js 官方提供的，例如 fs、path、http 等)
//     自定义模块(用户创建的每个 js 文件，都是自定义模块)
//     第三方模块(由第三方开发出来的模块，并非官方提供的内置模块，也不是用户创建的自定义模块，使用前需要先下载)



// 4 加载模块

// 使用强大的 require0 方法，可以加载需要的内置模块、用户自定义模块、第三方模块进行使用。例如:
// // 加载内置的 fs 模块
// const fs = require('fs')

// // 加载用户的自定义模块
// const custom = require('./custom.js')

// // 加载第三方模块(关于第三方模块的下载和使用，会在后面的课程中进行专门的讲解)
// const moment =require('moment')

// 注意：使用require()方法加载其他模块时 ，会执行被加载模块中的代码。
// 1. 引入 test.js 模块（注意使用相对路径 ./ ）
// const custom = require('./test.js')
// const custom = require('./test')  // 注意在引入模块时，如果省略了 .js 后缀，则 Node.js 会自动添加 .js 后缀。

// 2. 打印引入进来的对象 想正确引入模块并执行 模块名包括本js文件的文件名 必须英文且无空格
// console.log('访问名字：', custom.name);
// console.log('在 3 模块化.js 中接收到的数据：', custom);



// 5 模块作用域

// 模块作用域，类似函数作用域 就是模块内部定义的变量和方法等，只能在模块内部进行访问。这种模块级别的访问限制，称为模块作用域。
// 模块作用域好处：防止了全局变量污染的问题

// const custom = require('./test')
// console.log(custom) //输出{}空对象 无法访问模块内部定义的变量和方法



// 6 module对象

// 在每个.js自定义模块中都有一个module对象，里面存储了和当前模块有关的信息。
// console.log(module) //打印本js文件自己的module对象

// module.exports 对象

// 在自定义模块中，可以使用 module.exports 对象，将模块内的成员共享出去，供外界使用。
// 外界用 require() 方法导入白定义模块时，得到的就是 module.exports 所指向的对象。
// 在一个自定义模块中，默认情况下，module.exports=空对象 {}   跟5模块作用域测试效果一样
// 使用require()导入自定义模块时，导入的结果，永远以module.exports 指向的对象为准。 （当js文件最后再次出现module.exports指向一个对象时 会覆盖上文mudule.exports指向的对象）

// const m = require('./test')
// console.log(m)



// 7 exports 对象

// 由于 module.exports 单词写起来比较复杂，为了简化向外共享成员的代码，Node 提供了 exports 对象。
// 默认情况下，exports 和 module.exports 指向同一个对象。最终共亨的结果，还是以 module.exports 指向的对象为准。

// console.log(exports)
// console.log(module.exports)
// console.log(exports === module.exports)  // 证明默认指向同一个对象

// const m = require('./test')  // 演示exports暴露对象
// console.log(m)


// exports和module.exports使用误区
// 时刻谨记：require()导入模块时 返回的永远是 module.exports 指向的对象。
// const m = require('./test') 
// console.log(m)

// 为了防止混乱 建议大家不要在同一个模块中同时使用 exports 和 module.exports



// 8 Node.js 中的模块化规范
// Node.js 遵循了 CommonJS 模块化规范，CommonJS 规定了模块的特性和各模块之间如何相互依赖。

// CommonJS 规定:
// ①每个模块内部，module 变量代表当前模块。
// ②) module 变量是一个对象，它的 exports 属性(即 module.exports)是对外的接囗
// ③ 加载某个模块，其实是加载该模块的 module.exports 属性。require() 方法用于加载模块。



// 9 包
// node.js中的第三方模块 又叫做包； 由第三方个人或团队基于内置模块封装开发的 免费开源 供所有人使用；

// npm包网站：https://www.npmjs.com/     搜包
// npm包共享服务器：https://registry.npmjs.org/     下包   下包工具是npm命令

// 安装包的命令 默认下载最新版本的包 需要指定包的版本 需要加‘@版本号’ 包的版本号是点分十进制定义的，第一段是大版本 第二段是功能版本 第三段是bug修复版本
// npm install 包名
// npm i 包名 （简写）

// npm i moment // 安装moment包 格式化时间
// var moment = require('moment'); // 引入包 导入的包名 就是安装包 时候的名称
// console.log(moment().format('YYYY-MM-DD HH:mm:ss')); // 使用时候 进入搜包网站 搜索并查看官方api说明



// 初次装包 项目文件夹下多一个node_modules文件夹 和 package-lock.json配置文件。程序员不要手动修改，npm命令会自动维护。
// node_modules文件夹用来存放所有已经安装到项目的包。require()导入第三方包时，会自动从node_modules文件夹中寻找并加载。
// package-lock.json配置文件用来记录node_modules目录下的每一个包的下载信息，例如包名、版本号、下载地址等。

// npm已经装过一次的包，再次安装的时候如果版本号不一样，会重新下载安装并覆盖。