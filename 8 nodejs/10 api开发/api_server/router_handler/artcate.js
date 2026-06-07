const db = require('../db/index')

// 获取文章分类列表数据
exports.getArticleCates = function (req, res) {
    const sql = 'select * from ev_article_cate where is_delete=0 order by id asc'
    db.query(sql, function (err, results) {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取文章分类列表成功！',
            data: results
        })
        // res.send('getArticleCates ok')
    })
}

// 新增文章分类
exports.addArticleCates = function (req, res) {
    const sql = 'select * from ev_article_cate where name=? or alias=?'
    db.query(sql, [req.body.name, req.body.alias], function (err, results) {
        if (err) return res.cc(err)
        if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

        const sql = 'insert into ev_article_cate set ?'
        db.query(sql, req.body, function (err, results) {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('新增文章分类失败！')
            res.cc('新增文章分类成功！', 0)
        })
    })
    // res.send('addArticleCates ok')
}

// 根据 id 删除文章分类
exports.deleteCateById = function (req, res) {
    const sql = 'update ev_article_cate set is_delete=1 where id=?'  // 这里有一个bug 就是这个已经删除了 但是还能再次删除
    db.query(sql, req.params.id, function (err, results) {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除文章分类失败！')
        res.cc('删除文章分类成功！', 0)
    })
    // res.send('deleteCateById ok')
}

// 根据 Id 获取文章分类
exports.getArticleById = function (req, res) {
    const sql = 'select * from ev_article_cate where is_delete=0 and id=?'
    db.query(sql, req.params.id, function (err, results) {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取文章分类数据失败！')
        res.send({
            status: 0,
            message: '获取文章分类数据成功！',
            data: results[0]
        })
    })
    // res.send('getArticleById ok')
}

// 根据 Id 更新文章分类
exports.updateCateById = function (req, res) {
    const sql = 'select * from ev_article_cate where id<>? and (name=? or alias=?)'
    db.query(sql, [req.body.id, req.body.name, req.body.alias], function (err, results) {
        if (err) return res.cc(err)
        if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

        const sql = 'update ev_article_cate set ? where id=?'
        db.query(sql, [req.body, req.body.id], function (err, results) { 
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新文章分类失败！')
            res.cc('更新文章分类成功！', 0)
        })
    })
    // res.send('updateCateById ok')
}