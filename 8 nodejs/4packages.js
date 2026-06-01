// 包管理配置文件

// npm 规定，在项目根目录中，必须提供一个叫做 package.json 的包管理配置文件。用来记录与项目有关的一些配置信息。例如:
//     项目的名称、版本号、描述等
//     项目中都用到了哪些包
//     哪些包只在开发期间会用到
//     哪些包在开发和部署时都需要用到

// 多人协作时 发现项目目录中第三方包的体积过大 不方便团队成员之间共享项目源代码。解决方案：共享时剔除node_modules目录
// 项目根目录 创建package.json 配置文件 即可记录项目中用到的了哪些包。从而方便剔除node_modules目录后，在团队成员之间共享项目源代码。
// 注意：今后在项目开发中，一定要把node_modules文件夹，添加到.gitignore忽略文件中。
// 所以当我们拿到一个剔除的node_modules目录的项目后，需要先把所有的包下载到项目中。才能将项目运行起来。
// 此时可用npm install 命令或者（npm i）一次安装所有的包。


// 快速创建package.json文件：在项目为空的时候，就要运行npm init -y了
// npm init -y // 项目文件夹一定要英文且不要空格才能执行；运行npm install 命令安装包的时候，npm包管理工具会自动把包的名称和版本号写入package.json文件中。




// package.json配置文件说明：

// dependencies节点：记录项目开发和上线都需要用到的包，运行npm install 安装的依赖包；
// 拿到剔除了node_modules目录的项目后执行npm install命令，npm就会把dependencies节点中记录的包和版本安装到node_modules目录下。
// 卸载包 npm uninstall 包名时候 也会自动把卸载的包从dependencies节点中删除

// devDependencies节点：只在项目开发阶段会用到，项目上线用不到的包，安装到此节点中，安装时npm install --save-dev或 npm i 包名 -D
// 怎么判断哪些包只有开发环境用到，哪些包是上线用到的？在npm搜包网站接口文档里看安装命令就行了。

// name指定唯一包名：搜包网站上的包名不能有重复的，如果重复了 那就得改一下（包名不以目录名为准 以package.json中的name为准）

// version指定版本号

// main 指定入口文件

// description 描述 搜包时候会显示包名 版本号 和 描述

// keywords 搜索关键字 是一个字符串数组

// license 指定开源协议 默认是ISC



// 包的分类：
//     安装到node_modules目录下的包都是项目包；安装到全局的包都是全局包；
//     项目包又分为：开发环境包、上线环境包

// 只有工具性质的包，才有全局安装的必要性。如nrm i5ting_doc等
// 因为它们提供了好用的终端命令。如何判断这个包是否需要全局安装，在npm搜包网站接口文档里看安装命令就行了。

// 规范的包的结构：包必须以单独的目录而存在；顶级目录下必须有package.json文件；package.json文件必须包含name、version、main三个属性，分别代表包名、版本号、包的入口。
//   更多的约束见：https://yarnpkg.com/zh-Hans/docs/package-json



// 案例开发属于的自己包 功能1 格式化时间 2转义html（需要用户提交表单内容回显到页面时候 如果用户提供html代码会很危险 此时需要把'<>'转义为'&lt;'和'&gt;'）
// 案例见 itheima-tools文件夹
// 注意 搜包网站上的包名不能有重复的，如果重复了 那就得改一下（包名不以目录名为准 以package.json中的name为准）

// 步骤：初始化包的基本结构
// 新建 itheima-tools 文件夹，作为包的根目录
// 在 itheima-tools 文件夹中，新建如下三个文件:
//     package.json(包管理配置文件)
//     indexjs(包的入口文件)
//     README.md(包的说明文档)

// 将不同的功能进行模块化拆分
// ① 将格式化时间的功能，拆分到src ->dateFormat.js中
// ②)将处理 HTML字符串的功能，拆分到 src->htmlEscape.js 中
// ③ 在 index.js 中，导入两个模块，得到需要向外共享的方法
// ④ 在 index.js 中，使用 module.exports 把对应的方法共享出去

// 编写包的说明文档
// 包根目录中的 README.md 文件，是包的使用说明文档。通过它，我们可以事先把包的使用说明，以 markdown 的格式写出来，方便用户参考。
// README 文件中具体写什么内容，没有强制性的要求;只要能够清晰地把包的作用、用法、注意事项等描述清楚即可。
// 我们所创建的这个包的 README.md 文档中，会包含以下6项内容:
// 安装方式、导入方式、格式化时间、转义 HTML中的特殊字符、还原 HTML 中的特殊字符、开源协议

// 测试模块
// const itheima = require('./itheima-tools/index')
// const itheima = require('./itheima-tools')   // 省略index.js 也能实现 这是package.json中main字段的配置的作用

// // 测试时间 格式化功能
// const dtStr = itheima.dateFormat(new Date())
// console.log(dtStr)

// // 测试转义html字符串功能
// const htmlStr = '<h1 title="abc">这是h1标签<span>123&nbsp;</span></h1>'
// const newHtmlStr = itheima.htmlEscape(htmlStr)
// console.log(newHtmlStr)

// // 测试反转义html字符串功能
// const newHtmlStr2 = itheima.htmlUnEscape(newHtmlStr)
// console.log(newHtmlStr2)



// 发布包

// 1 注册 npm 账号
//     访问 https://www.npmjs.com/ 网站，点击 sign up 按钮，进入注册用户界面
//     填写账号相关的信息:Full Name、Public Email、Username、Password
//     点击 Create an Account 按钮，注册账号
//     登录邮箱，点击验证链接，进行账号的验证

// 2 登录 npm 账号
//     npm 账号注册完成后，可以在终端中执行 npm login 命令，依次输入用户名、密码、邮箱后，即可登录成功。
//     注意:在运行npm login 命令之前，必须先把下包的服务器地址切换为 npm 的官方服务器。否则会导致发布包失败!

// 3.把包发布到 npm 上
//     将终端切换到包的根目录之后，运行npm publish 命令，即可将包发布到 npm 上(注意:包名不能雷同)

// 4 验证
//     访问 https://www.npmjs.com/ 网站，点击 sign in 按钮登录；然后点击packages就可以看到自己发布的包了

// 5 删除已发布的包
    // 运行 npm unpublish 包名 --force 命令，即可从 npm 删除已发布的包.
    // 注意:
    // ① npm unpublish 命令只能删除 72 小时以内发布的包
    // ② npm unpublish 删除的包，在 24 小时内不允许重复发布
    // ③ 发布包的时候要慎重，尽量不要往 npm 上发布没有意义的包!



// 模块的加载机制

// 1 优先从缓存中加载
//     模块在第一次加载后会被缓存。这也意味着多次调用 require() 不会导致模块的代码被执行多次。
//     注意:不论是内置模块、用户自定义模块、还是第三方模块，它们都会优先从缓存中加载，从而提高模块的加载效率。

// require('./test');
// require('./test');
// require('./test'); // 只会打印一次ok

// 2 内置模块的加载机制
//     内置模块是由 Node.js 官方提供的模块，内置模块的加载优先级最高。
//     例如，require('fs')始终返回内置的 fs 模块，即使在 node modules 目录下有名字相同的包也叫做 fs。

// 3 自定义模块的加载机制
//     使用 require() 加载自定义模块时，必须指定以./或../开头的路径标识符。
//     在加载自定义模块时，如果没有指定 ./或../这样的路径标识符，则 node 会把它当作内置模块或第三方模块进行加载.
// require('test'); // 出现找不到模块报错 没有这样的自定义模块或第三方模块

// 同时，在使用require() 导入自定义模块时，如果省略了文件的扩展名，则 Node.js 会按顺序分别尝试加载以下的文件:
//     ① 按照确切的文件名进行加载
//     ② 补全 js 扩展名进行加载
//     ③ 补全 json 扩展名进行加载
//     ④ 补全 .node 扩展名进行加载
//     ⑤ 加载失败，终端报错

// 4 第三方模块的加载机制
// 如果传递给require0 的模块标识符不是一个内置模块，也没有以'./'或'../'开头，则 Node.js 会从当前模块的父目录开始，尝试从/node modules 文件夹中加载第三方模块。
// 如果没有找到对应的第三方模块，则移动到再上一层父目录中，进行加载，直到文件系统的根目录。
// 例如，假设在'C:\Users\itheima\project\foo.js'文件里调用了 require('tools')，则 Node.js 会按以下顺序查找
//     ① C:\Users\itheima\project\node_modules\tools
//     ② C:\Users\itheima\node_modules\tools
//     ③ C:\Users\node_modules\tools
//     ④ C:\node_modules\tools

// 5 目录作为模块
// 当把目录作为模块标识符，传递给require() 进行加载的时候，有三种加载方式:
//     ① 在被加载的目录下查找一个叫做 package.json 的文件，并寻找 main 属性，作为require() 加载的入口
//     ② 如果目录里没有 package.json 文件，或者 main 入口不存在或无法解析，则 Node.js 将会试图加载目录下的 index.js 文件。
//     ③ 如果以上两步都失败了，则 Node.js 会在终端打印错误消息，报告模块的缺失:Error: Cannot find module 'xxx'

