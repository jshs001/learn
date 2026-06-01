// 数据库的基本概念略、软件安装用phpstudy、连接数据库用navicat premium
// sql语法略 这里使用的数据库软件是mysql8 数据库是learn_nodejs
// 注意这里 node 执行js js文件名要英文无空格 否则无返回

// 项目中需要mysql模块来连接和操作mysql数据库
// npm i mysql // 安装mysql模块

// 配置代码如下：
const mysql = require('mysql'); // 引入mysql模块
const db = mysql.createPool({ // 创建数据库连接池
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'learn_nodejs'
})

// 测试连接性[ RowDataPacket { '1': 1 } ]； 注意这里 node 执行js js文件名要英文无空格 否则无返回
// db.query('select 1', (err, results) => {  
//   if (err) return console.log(err.message);
//   console.log(results);
// })

// 查询 users表中所有数据  select查询语句结果是一个数组
// const sqlStr = 'select * from users'
// db.query(sqlStr, (err, results) => { 
//   if (err) return console.log(err.message);
//   console.log(results);
// })

// 插入数据1条数据 insert into插入语句 results是一个对象 results.affectedRows属性表示影响的行数
// const user = { id:4 ,name :'ml' } // 定义数据对象
// const sqlStr2 = 'insert into users (id,name) values (?,?)' // 待执行的sql ？ 表示占位符
// db.query(sqlStr2, [user.id, user.name], (err, results) => { // 执行插入语句 [user.id, user.name]使用数组形式 依次为？占位符赋值
//   if (err) return console.log(err.message);
//   if (results.affectedRows === 1) { // 影响的行数
//     console.log('插入数据成功');
//   }
// })

// 插入数据便捷方式 set ? 如果数据对象的每个属性和数据表的字段名一致，则可以这样写
// const user = { id: 5, name: 'zx' };
// const sqlStr3 = 'insert into users set ?';  // ? 占位符
// db.query(sqlStr3, user, (err, results) => { 
//   if (err) return console.log(err.message);
//   if (results.affectedRows === 1) { // 影响的行数
//     console.log('插入数据成功');
//   }
// })

// 更新数据 update语句执行结果也是一个对象 可以通过affectedRows属性判断是否更新成功
// const user = { id: 5, name: 'zxx' };
// const sqlStr4 = 'update users set name=? where id=?'
// db.query(sqlStr4, [user.name, user.id], (err, results) => { 
//   if (err) return console.log(err.message);
//   if (results.affectedRows === 1) { // 影响的行数
//     console.log('更新数据成功');
//   }
// })

// 更新数据便捷方式 如果数据对象的每个属性和数据表的字段名一致，则可以这样写
// const user = { id: 5, name: 'zxxx' };
// const sqlStr5 = 'update users set ? where id=?'
// db.query(sqlStr5, [user, user.id], (err, results) => { 
//   if (err) return console.log(err.message);
//   if (results.affectedRows === 1) { // 影响的行数
//     console.log('更新数据成功');
//   }
// })

// 删除数据 delete语句执行结果也是一个对象 可以通过affectedRows属性判断是否更新成功
// const sqlStr6 = 'delete from users where id=?'
// db.query(sqlStr6, 5, (err, results) => {  // 如果对应多个占位符可以用数组，就一个占位符可以用变量或直接写值
//   if (err) return console.log(err.message);
//   if (results.affectedRows === 1) { // 影响的行数
//     console.log('删除数据成功');
//   }
// })

// 标记删除
// 使用 DELETE 语句，会把真正的把数据从表中删除掉。为了保险起见，推荐使用标记删除的形式，来模拟删除的动作。
// 所谓的标记删除，就是在表中设置类似于 status 这样的状态字段，来标记当前这条数据是否被删除。
// 当用户执行了删除的动作时，我们并没有执行 DELETE 语句把数据删除掉，而是执行了 UPDATE 语句，将这条数据对应的 status 字段标记为删除即可。
// 这里不演示了 需要一个status标记字段 0正常 1删除 然后执行update语句 将status字段置为1