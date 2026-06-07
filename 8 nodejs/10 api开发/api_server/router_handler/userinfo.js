const db = require('../db/index')
const bcrypt = require('bcryptjs') // 引入导入处理用户密码的模块

// 获取用户基本信息的处理函数
exports.getUserInfo = function (req, res) {
    // 防御性编程：如果 req.user 不存在，说明身份验证未通过或中间件配置有误
    if (!req.auth || !req.auth.id) {
        return res.cc('身份认证失败，请重新登录')
    }
    const sql = 'select id, username, nickname, email, user_pic from ev_users where id=?'
    db.query(sql, req.auth.id, function (err, results) { // 我这个版本的 JWT 中间件 把信息挂到了req.auth
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取用户信息失败！')
        res.send({
            status: 0,
            message: '获取用户信息成功！',
            data: results[0],
        })
    })

    // res.send('Get user list.') 
}

// 更新用户基本信息的处理函数
exports.updateUserInfo = function (req, res) {
    const sql = 'update ev_users set ? where id=?'
    db.query(sql, [req.body, req.body.id], function (err, results) {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更新用户的基本信息失败！')
        res.cc('更新用户信息成功！', 0)
    })

    // res.send('Update user info.')
}

// 更新用户密码的处理函数
exports.updatePassword = function (req, res) {
    const sql = 'select * from ev_users where id=?'
    db.query(sql, req.auth.id, function (err, results) {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('用户不存在')

        // 验证旧密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResult) return res.cc('旧密码错误！')

        // 更新密码
        const sql = 'update ev_users set password=? where id=?'
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        db.query(sql, [newPwd, req.auth.id], function (err, results) {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新密码失败！')
            res.cc('更新密码成功！', 0)
        })

        // res.cc('更新密码成功！', 0)
    })

    // res.send('Update password.')
}

// 更新用户头像的处理函数
exports.updateAvatar = function (req, res) {
    // console.log('Received Body:', req.body);
    // console.log('Avatar Value:', req.body.avatar);
    // console.log('Avatar Type:', typeof req.body.avatar);
    const sql = 'update ev_users set user_pic=? where id=?'
    db.query(sql, [req.body.avatar, req.auth.id], function (err, results) {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更新头像失败！')
        res.cc('更新头像成功！', 0)
    }) 
    // 如果非要用 x-www-form-urlencoded验证 base64的代码一定不要加空格和换行
    // res.cc('Update avatar.',0)
}