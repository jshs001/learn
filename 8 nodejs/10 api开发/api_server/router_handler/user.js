const db = require('../db/index') // 引入数据库操作模块
const bcrypt = require('bcryptjs') // 密码加密模块
const jwt = require('jsonwebtoken') // 导入生成token的包
const config = require('../config') // 导入全局配置文件


// 注册新用户的处理函数
exports.regUser = function (req, res) {
    const userinfo = req.body // 获取客户端用户提交的信息
    // console.log(userinfo)

    // 1 检测表单数据是否合法；
    if (!userinfo.username || !userinfo.password || userinfo.username.trim().length === 0 || userinfo.password.trim().length === 0) { // 判断用户名或密码是否为空
        // return res.send({ status: 1, message: '用户名或密码不能为空' }) 
        return res.cc('用户名或密码不能为空')
    }

    // 2 检测用户名是否被占用；
    const sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr, [userinfo.username], function (err, results) {
        if (err) return res.send({ status: 1, message: err.message })
        if (results.length > 0) {
            // return res.send({ status: 1, message: '用户名被占用，请更换其他用户名' })
            return res.cc('用户名被占用，请更换其他用户名')
        }

        // 3. 对密码进行加密处理
        console.log(userinfo.password)
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        console.log(userinfo.password)

        // 4. 插入新用户
        const sql = 'insert into ev_users set ?'
        db.query(sql, userinfo, function (err, results) {
            // if (err) return res.send({ status: 1, message: err.message })
            if (err) return res.cc(err)
            // if (results.affectedRows !== 1) return res.send({ status: 1, message: '注册用户失败，请稍后再试' })
            if (results.affectedRows !== 1) return res.cc('注册用户失败，请稍后再试')
            // res.send({ status: 0, message: '注册成功' })
            res.cc('注册成功', 0)
        })
    })
    // res.send('reguser ok')
}

// 登录的处理函数
exports.login = function (req, res) {
    const userInfo = req.body // 获取表单数据

    const sql = 'select * from ev_users where username=?' // 根据用户名查询用户的数据；

    db.query(sql, userInfo.username, function (err, results) {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('登录失败！')

        const compareResult = bcrypt.compareSync(userInfo.password, results[0].password)// 判断用户输入的密码是否正确；
        if (!compareResult) return res.cc('登录失败！')

        // 在服务器端生成 Token 字符串
        const user = { ...results[0], password: '', user_pic: '' } // es6高级语法，剔除用户密码和头像
        // console.log(user);
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
        res.send({
            status: 0,
            message: '登录成功！',
            token: 'Bearer ' + tokenStr,
        })
    })

}